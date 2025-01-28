const zod = require("zod");

// Schema for creating a TODO
const createTodo = zod.object({
    title: zod.string().min(1, "Title is required"),
    description: zod.string().min(1, "Description is required"),
});

// Schema for updating a TODO
const updateTodo = zod.object({
    id: zod.string().min(1, "ID is required"),
    title: zod.string().optional(), // Optional for updates
    description: zod.string().optional(), // Optional for updates
});

module.exports = {
    createTodo,
    updateTodo,
};
