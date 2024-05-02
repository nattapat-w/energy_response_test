import { render } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

describe("App component", () => {
  it("renders the App component should render card header", () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByText(/To-do List/i)).toBeInTheDocument();
  });
});
