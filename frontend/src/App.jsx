import { useState, useEffect } from 'react';
import './App.css';
import { CreateTodo } from './component/CreateTodo';
import { Todos } from './component/Todos';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(async (res) => {
        const json = await res.json();
        setTodos(json);  // ✅ Fix: Assign the full JSON response
      })
      .catch((error) => console.error("Error fetching todos:", error));
  }, []); // Runs only once on mount

  return (
    <>
      <CreateTodo />
      {todos.length > 0 ? (
        <Todos todos={todos} />
      ) : (
        <p>Loading or no todos available...</p>
      )}
    </>
  );
}

export default App;
