import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders draft section", () => {
  
  render(<App />);

  const draftElement = screen.getByText(/Draft/i);
  expect(draftElement).toBeInTheDocument();
});

test("renders inprogress section", () => {
  
  render(<App />);

  const inprogressElement = screen.getByText(/In Progress/i);
  expect(inprogressElement).toBeInTheDocument();
});

test("renders completed section", () => {
  
  render(<App />);

  const completedElement = screen.getByText(/Completed/i);
  expect(completedElement).toBeInTheDocument();
});

test("renders add new Todo", () => {
  
  render(<App />);

  const addNewTodoElement = screen.getByText(/Add New Todo/i);
  expect(addNewTodoElement).toBeInTheDocument();
});
