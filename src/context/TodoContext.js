// TodoContext.js

import { createContext, useState, useEffect } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "first todo",
      text: "this is the first todo",
      status: "draft",
    },
    {
      id: 2,
      title: "second todo",
      text: "this is the second todo",
      status: "inprogress",
    },
    {
      id: 3,
      title: "third todo",
      text: "this is the third todo",
      status: "completed",
    },
  ]);

  const [theme, setTheme] = useState("light");
  const [isNewTodoButtonEnabled, setIsNewTodoButtonEnabled] = useState(false);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const draggedTodo = todos.find(
      (todo) => todo.id.toString() === draggableId
    );
    if (!draggedTodo) return;

    // Remove from source list
    const sourceList = todos
      .filter((todo) => todo.status === source.droppableId)
      .sort((a, b) => a.id - b.id); // stable order
    const [movedItem] = sourceList.splice(source.index, 1);

    // Update its status if moved to a different column
    if (source.droppableId !== destination.droppableId) {
      movedItem.status = destination.droppableId;
    }

    // Insert into destination list
    const destinationList = todos
      .filter(
        (todo) =>
          todo.status === destination.droppableId && todo.id !== movedItem.id
      )
      .sort((a, b) => a.id - b.id);

    destinationList.splice(destination.index, 0, movedItem);

    // Combine all columns into final list
    const otherTodos = todos.filter(
      (todo) =>
        todo.status !== source.droppableId &&
        todo.status !== destination.droppableId
    );

    const updatedTodos = [...otherTodos, ...destinationList];
    setTodos(updatedTodos);
  };

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        theme,
        setTheme,
        isNewTodoButtonEnabled,
        setIsNewTodoButtonEnabled,
        onDragEnd,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
