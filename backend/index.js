const express = require("express");
const { createTodo, updateTodo } = require("./types"); // Importing Zod schemas
const { Todo } = require("./db"); // Importing Mongoose model
const app = express();

app.use(express.json());

// GET route - Health check
app.get("/", (req, res) => {
    res.send("Server is Running");
});

// POST route - Create a new TODO
app.post("/todo", async (req, res) => {
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);

    if (!parsePayload.success) {
        return res.status(400).json({
            msg: "You sent the wrong inputs",
            errors: parsePayload.error.errors, // Zod validation errors
        });
    }

    try {
        await Todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false,
        });

        res.status(201).json({
            msg: "Todo Created",
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error creating Todo",
            error: error.message,
        });
    }
});

// GET route - Fetch all TODOs
app.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({
            msg: "Error fetching Todos",
            error: error.message,
        });
    }
});

// PUT route - Mark TODO as completed
app.put("/completed", async (req, res) => {
    const updatePayload = req.body;
    const parsePayload = updateTodo.safeParse(updatePayload);

    if (!parsePayload.success) {
        return res.status(400).json({
            msg: "You sent the wrong inputs",
            errors: parsePayload.error.errors, // Zod validation errors
        });
    }

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            updatePayload.id,
            { completed: true },
            { new: true } // Return the updated document
        );

        if (!updatedTodo) {
            return res.status(404).json({
                msg: "Todo not found",
            });
        }

        res.status(200).json({
            msg: "Todo marked as completed",
            todo: updatedTodo,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error updating Todo",
            error: error.message,
        });
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
