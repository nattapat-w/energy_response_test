import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Task from "./Task";
import { Provider } from "react-redux";
import store from "../store";
import { configureStore } from "@reduxjs/toolkit";
import filterTodoSlice from "../reducers/filterTodoSlice";
import todoListSlice from "../reducers/todoListSlice";
const mockTask = {
  id: 1,
  title: "Test Task",
  description: "This is a test description",
  isCompleted: false,
};

describe("Task component", () => {
  test("renders task with title and description should render correctly", () => {
    render(
      <Provider store={store}>
        <Task task={mockTask} />
      </Provider>
    );

    const titleElement = screen.getByText(mockTask.title);
    const descriptionElement = screen.getByText(mockTask.description);

    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe("Test Task");
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement.textContent).toBe("This is a test description");
  });

  test("incompletedTask checkbox should be false", () => {
    render(
      <Provider store={store}>
        <Task task={mockTask} />
      </Provider>
    );
    const checkbox: HTMLInputElement = screen.getByRole("checkbox");

    expect(checkbox.checked).toBeFalsy();
  });

  test("completedTask checkbox should be true", () => {
    const completedTask = { ...mockTask, isCompleted: true };
    render(
      <Provider store={store}>
        <Task task={completedTask} />
      </Provider>
    );

    const checkbox: HTMLInputElement = screen.getByRole("checkbox");

    expect(checkbox).toBeTruthy();
  });

  test("completedTask should have line-through style", () => {
    const completedTask = { ...mockTask, isCompleted: true };
    const { getByTestId } = render(
      <Provider store={store}>
        <Task task={completedTask} />
      </Provider>
    );
    const completedTaskText = getByTestId("ListItemText");

    expect(completedTaskText).toHaveStyle("text-decoration: line-through");
  });
  test("task should be null after deleted", async () => {
    const mockStore = configureStore({
      reducer: {
        todoList: todoListSlice,
        filterTodo: filterTodoSlice,
      },
    });
    const { getByLabelText, findByLabelText } = render(
      <Provider store={mockStore}>
        <Task task={mockTask} />
      </Provider>
    );
    const deleteButton = getByLabelText(`delete-task-1`);
    fireEvent.click(deleteButton);
    waitFor(() => {
      expect(findByLabelText(`delete-task-1`)).toBeNull();
    });
  });
  test("task complete state should change after toggle", async () => {
    const mockStore = configureStore({
      reducer: {
        todoList: todoListSlice,
        filterTodo: filterTodoSlice,
      },
    });
    const { getByLabelText } = render(
      <Provider store={mockStore}>
        <Task task={mockTask} />
      </Provider>
    );
    const toggleCheckbox = getByLabelText(`toggle-task-1`);
    fireEvent.click(toggleCheckbox);
    const initState = mockTask.isCompleted;
    const checkbox: HTMLInputElement = screen.getByLabelText("toggle-task-1");

    waitFor(() => {
      expect(checkbox && initState).toBeFalsy();
    });
  });
});
