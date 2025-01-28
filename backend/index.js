const express = require("express");
const app = express();

app.use(express.json());

// GET route
app.get("/", (req, res) => {
    res.send("Server is Running");
});

// POST route
app.post("/todo", (req, res) => {
    res.send("Response");
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
