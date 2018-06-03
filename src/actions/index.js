export const READ_EVENTS = 'READ_EVENTS';
export const CREATE_EVENT = 'CREATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENTS';
// export const GET_EVENT = 'GET_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';

// リクエスト開始
export const readEvents = todoList => ({
  type: READ_EVENTS,
  payload: { todoList },
});

// 新規作成
export const postEvent = value => ({
  type: CREATE_EVENT,
  payload: { value },
});

export const deleteEvent = key => ({
  type: DELETE_EVENT,
  payload: { key },
});
// 1つのデータを受け取る
// export const getEvent = todoList => ({
//   type: GET_EVENT,
//   payload: { todoList },
// });
export const updateEvent = value => ({
  type: UPDATE_EVENT,
  payload: { value },
});

