export function Todos({todos}) {
    return <div>
        {todos.map(function(tod )
        return <div>
        <h1>{todos.title}</h1>
        <h2>{todos.description}</h2>
        <button>{todos.completed==true ? "Completed" : "Mark as a Complete"}</button>
        )}
    </div>
}