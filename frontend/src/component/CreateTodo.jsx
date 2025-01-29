import { useState } from "react";

export function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAddTodo = async () => {
        if (!title.trim() || !description.trim()) {
            alert("Title and description cannot be empty!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/todo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Todo added successfully!");
                setTitle(""); // Reset input
                setDescription("");
            } else {
                alert(data.msg || "Failed to add todo");
            }
        } catch (error) {
            console.error("Error adding todo:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-lg max-w-sm mx-auto bg-white">
            <h2 className="text-xl font-semibold mb-2">Create a Todo</h2>
            <input 
                type="text" 
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded mb-2"
            />
            <input 
                type="text" 
                placeholder="Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded mb-2"
            />
            <button 
                onClick={handleAddTodo}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
                Add a Todo
            </button>
        </div>
    );
}
