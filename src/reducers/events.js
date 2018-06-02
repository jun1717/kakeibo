import firebase from 'firebase';
import { READ_EVENTS, CREATE_EVENT } from '../actions';


// 初期 状態
const initialState = {
  // categoryId: undefined,
  todoList: [],
  id: 0,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case READ_EVENTS: {
      return {
        todoList: action.payload.todoList,
      };
    }
    case CREATE_EVENT: {
      const values = action.payload.value;
      const db = firebase.firestore();
      db.collection('todos').add({
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
    default:
      return state;
  }
};
