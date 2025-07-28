import { ADDTODO, REMOVETODO, DONETODO } from "./actionTypes.js";
export const TodoReducer = (state = [], action) => {
  switch (action.type) {
    case ADDTODO: {
      return [...state, action.payload];
    }
    case REMOVETODO: {
      return state.filter((todo) => todo.id !== Number(action.payload));
    }

    case DONETODO: {
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isCompleted: true } : todo
      );
    }

    default:
      return state;
  }
};
