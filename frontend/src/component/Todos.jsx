export function Todos({ todos = [] }) {
    return (
      <div>
        {todos.map((tod, index) => (
          <div key={index}>
            <h1>{tod.title}</h1>
            <h2>{tod.description}</h2>
            <button>{tod.completed ? "Completed" : "Mark as Complete"}</button>
          </div>
        ))}
      </div>
    );
  }
  