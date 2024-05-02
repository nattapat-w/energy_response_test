import { render } from "@testing-library/react";
import TodoList from "./TodoList";
import { Provider } from "react-redux";
import store from "../store";
import { ITask } from "./Task";

const mockTodoList: ITask[] = [
  {
    id: 1,
    title: "Test Task 1",
    description: "This is a test description",
    isCompleted: false,
  },
  {
    id: 2,
    title: "Test Task 2",
    description: "This is a test description",
    isCompleted: false,
  },
];

describe("TodoList component", () => {
  test("renders list items when todoList is not empty", () => {
    const { getByText } = render(
      <Provider store={store}>
        <TodoList todoList={mockTodoList} />
      </Provider>
    );
    expect(getByText(/Test Task 1/i)).toBeInTheDocument();
    expect(getByText(/Test Task 2/i)).toBeInTheDocument();
  });

  test("renders empty message when todoList is empty", () => {
    const { getByText } = render(
      <Provider store={store}>
        <TodoList todoList={[]} />
      </Provider>
    );
    expect(getByText(/Task is empty/i)).toBeInTheDocument();
    expect(getByText(/Create new task!/i)).toBeInTheDocument();
  });
});
