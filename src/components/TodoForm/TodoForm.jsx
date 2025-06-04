import { useContext, useState } from "react";
import { TodoContext } from "../../context/TodoContext";
import "./TodoForm.css";
const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const [todoTitle, setTodoTitle] = useState("");

  const { setTodos, setIsNewTodoButtonEnabled } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), title: todoTitle, text: todo, status: "draft" },
    ]);

    setTodo("");
    setTodoTitle("");
  };

  const handleCancel = () => {
    setIsNewTodoButtonEnabled(false);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        name=""
        id=""
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        placeholder="Add todo title"
      />
      <textarea
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add todo description"
        rows={5}
      ></textarea>
      <div className="button--containers">
        <button type="submit" className="btn">
          Add Todo
        </button>
        <button type="submit" onClick={handleCancel} className="btn cancel">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
