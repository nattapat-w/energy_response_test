import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterTodoState {
  filter: "all" | "completed" | "incomplete";
}

const initialState: FilterTodoState = {
  filter: "all",
};

const filterTodoSlice = createSlice({
  name: "filterTodo",
  initialState,
  reducers: {
    setFilterTodo: (state, action: PayloadAction<"all" | "completed" | "incomplete">) => {
      state.filter = action.payload;
    },
  },
});

export const { setFilterTodo } = filterTodoSlice.actions;

export default filterTodoSlice.reducer;
