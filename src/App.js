import "./App.css";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <TodoProvider>
      <Header />
      <main>
        <TodoList />
      </main>
    </TodoProvider>
  );
}

export default App;
