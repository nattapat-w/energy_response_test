import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../TodoList/Task";

interface TodoListState {
  tasks: ITask[];
}

const initialState: TodoListState = {
  tasks: [],
};

const todoListSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      state.tasks.push(action.payload);
      localStorage.setItem("todoList", JSON.stringify(state.tasks));
    },
    toggleTask: (state, action: PayloadAction<ITask>) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
      localStorage.setItem("todoList", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action: PayloadAction<ITask>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
      localStorage.setItem("todoList", JSON.stringify(state.tasks));
    },
    fetchTodoList: (state) => {
      const todoList = localStorage.getItem("todoList");
      if (todoList) {
        state.tasks = JSON.parse(todoList);
      }
    },
  },
});

export const { addTask, toggleTask, deleteTask, fetchTodoList } =
  todoListSlice.actions;

export default todoListSlice.reducer;
