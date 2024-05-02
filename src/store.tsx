import { configureStore } from '@reduxjs/toolkit';
import todoListReducer from './reducers/todoListSlice';
import filterTodoReducer from "./reducers/filterTodoSlice";

const store = configureStore({
  reducer: {
    todoList: todoListReducer,
    filterTodo: filterTodoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
