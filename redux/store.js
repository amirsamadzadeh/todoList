import { TodoReducer } from "./reducers.js";
export const store = Redux.createStore(TodoReducer);

store.subscribe(() => {
  console.log(store.getState());
});
