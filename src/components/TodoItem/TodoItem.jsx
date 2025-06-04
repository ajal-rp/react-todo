import { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";
import "./TodoItem.css";
const TodoItem = ({ todo }) => {
  const { setTodos } = useContext(TodoContext);

  const toggleComplete = () => {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTodo = () => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
  };

  return (
    <div className="todo-item">
      <div className="todo--title--container">
        <h4>{todo.title}</h4>
        <div className="todo--button-wrapper">
          <button onClick={deleteTodo} title="Delete">🗑️</button>
        </div>
      </div>
      <p>{todo.text}</p>
    </div>
  );
};

export default TodoItem;
