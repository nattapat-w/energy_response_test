import { render, fireEvent, waitFor } from "@testing-library/react";
import NewTask from "./NewTask";
import { Provider } from "react-redux";
import store from "../store";
import { configureStore } from "@reduxjs/toolkit";
import filterTodoSlice from "../reducers/filterTodoSlice";
import todoListSlice from "../reducers/todoListSlice";

describe("NewTask component", () => {
  it("new task component render on open", () => {
    const onClose = vi.fn();
    const { getByText } = render(
      <Provider store={store}>
        <NewTask open={true} onClose={onClose} />
      </Provider>
    );
    expect(getByText("Add To-do Task")).toBeInTheDocument();
  });

  it("new task component close on cancel", () => {
    const onClose = vi.fn();
    const { getByText } = render(
      <Provider store={store}>
        <NewTask open={true} onClose={onClose} />
      </Provider>
    );
    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("new task should be added after submit", async () => {
    const mockStore = configureStore({
      reducer: {
        todoList: todoListSlice,
        filterTodo: filterTodoSlice,
      },
    });
    const onClose = vi.fn();
    const { getByText, getByTestId } = render(
      <Provider store={mockStore}>
        <NewTask open={true} onClose={onClose} />
      </Provider>
    );
    const newTaskTitle = getByTestId("new-task-title");
    const newTaskDescription = getByTestId("new-task-description");

    fireEvent.change(newTaskTitle, { target: { value: "New Task" } });
    fireEvent.change(newTaskDescription, {
      target: { value: "Task Description" },
    });

    const confirmButton = getByText("Confirm");
    fireEvent.click(confirmButton);
    await waitFor(() => {
      const state = mockStore.getState();
      const tasks = state.todoList.tasks;

      expect(tasks).toContainEqual({
        id: expect.any(Number),
        title: "New Task",
        description: "Task Description",
        isCompleted: false,
      });
    });
  });
  it("new task shouldn't be added if title is empty", async () => {
    const mockStore = configureStore({
      reducer: {
        todoList: todoListSlice,
        filterTodo: filterTodoSlice,
      },
    });
    const onClose = vi.fn();
    const { getByText, getByTestId } = render(
      <Provider store={mockStore}>
        <NewTask open={true} onClose={onClose} />
      </Provider>
    );
    const newTaskTitle = getByTestId("new-task-title");

    fireEvent.change(newTaskTitle, { target: { value: "" } });

    const confirmButton = getByText("Confirm");
    fireEvent.click(confirmButton);
    await waitFor(() => {
      const state = mockStore.getState();
      const tasks = state.todoList.tasks;
      expect(tasks).toHaveLength(0);
    });
  });
});
