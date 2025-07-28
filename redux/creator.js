import { ADDTODO, REMOVETODO, DONETODO } from "./actionTypes.js";

export const addTodo = (payload) => ({
  type: ADDTODO,
  payload,
});
export const removeTodo = (payload) => ({
  type: REMOVETODO,
  payload: Number(payload),
});
export const todoCompleted = (payload) => ({
  type: DONETODO,
  payload: Number(payload),
});
