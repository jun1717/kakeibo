import firebase from 'firebase';
import { READ_EVENTS, CREATE_EVENT, DELETE_EVENT } from '../actions';


// 初期 状態
const initialState = {
  // categoryId: undefined,
  todoList: [],
  id: 0,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case READ_EVENTS: {
      const list = action.payload.todoList;
      list.sort((a, b) => (a.id < b.id ? -1 : 1));
      return {
        todoList: action.payload.todoList,
      };
    }
    case CREATE_EVENT: {
      const values = action.payload.value;
      const db = firebase.firestore();
      db.collection('todos').add({
        id: state.todoList.length + 1,
        title: values.title,
        body: values.body,
      })
        .then((docRef) => {
          console.log('success', docRef);
        })
        .catch((error) => {
          console.log(error);
        });
      return {
        todoList: initialState.todoList,
      };
    }
    case DELETE_EVENT: {
      const keyId = action.payload.key;
      const db = firebase.firestore();
      db.collection('todos').doc(keyId).delete()
        .then((docRef) => {
          console.log('success', docRef);
        })
        .catch((error) => {
          console.log(error);
        });
      return {
        todoList: initialState.todoList,
      };
    }
    // case GET_EVENT: {
    //   firebase.firestore().collection('todos')
    //     .onSnapshot((snapshot) => {
    //       const list = [];
    //       snapshot.forEach((doc) => {
    //         list.push({ ...doc.data(), key: doc.id });
    //       });
    //       console.log('list', list);
    //     });
    //   return {
    //     todoList: list,
    //   };
    // }
    default:
      return state;
  }
};
