const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
    .connect(process.env.MongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

// Define the schema
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

// Create the model
const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
    Todo,
};
