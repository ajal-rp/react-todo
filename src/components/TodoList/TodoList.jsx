import { useContext, useMemo } from "react";
import { TodoContext } from "../../context/TodoContext";
import TodoForm from "../TodoForm/TodoForm";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd"; // ✅ use maintained fork

const TodoList = () => {
  const {
    todos,
    setTodos,
    isNewTodoButtonEnabled,
    setIsNewTodoButtonEnabled,
  } = useContext(TodoContext);

  const handleNewTodoButton = () => setIsNewTodoButtonEnabled(true);

  // ✅ useMemo to stabilize column structure
  const columns = useMemo(() => ({
    draft: {
      name: "Draft",
      items: todos.filter((todo) => todo.status === "draft"),
    },
    inprogress: {
      name: "In Progress",
      items: todos.filter((todo) => todo.status === "inprogress"),
    },
    completed: {
      name: "Completed",
      items: todos.filter((todo) => todo.status === "completed"),
    },
  }), [todos]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const items = Array.from(columns[source.droppableId].items);
      const [moved] = items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);

      const others = todos.filter(
        (t) => t.status !== source.droppableId
      );
      setTodos([...others, ...items]);
    } else {
      const sourceItems = Array.from(columns[source.droppableId].items);
      const destItems = Array.from(columns[destination.droppableId].items);

      const [moved] = sourceItems.splice(source.index, 1);
      moved.status = destination.droppableId;
      destItems.splice(destination.index, 0, moved);

      const others = todos.filter(
        (t) =>
          t.status !== source.droppableId &&
          t.status !== destination.droppableId
      );
      setTodos([...others, ...sourceItems, ...destItems]);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="todo-board">
        {Object.entries(columns).map(([columnId, column]) => (
          <div key={columnId} className="todo-column">
            <h3 className={`${columnId}-heading`}>
              {column.name} ({column.items.length})
            </h3>

            <Droppable droppableId={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="todo-items"
                >
                  {column.items.map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="draggable-item"
                        >
                          <TodoItem todo={todo} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}

                  {columnId === "draft" && !isNewTodoButtonEnabled && (
                    <div className="btn-wrapper">
                      <button onClick={handleNewTodoButton} className="btn">
                        Add New Todo
                      </button>
                    </div>
                  )}
                </div>
              )}
            </Droppable>

            {columnId === "draft" && isNewTodoButtonEnabled && <TodoForm />}
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TodoList;
