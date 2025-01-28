const express = require("express");
const app = express();
const {createTodo, updateTodo}=require("./types");
app.use(express.json());

// GET route
app.get("/", (req, res) => {
    res.send("Server is Running");
});

// POST route
app.post("/todo", async(req, res) => {
    const createPayload=req.body;
    const parsePayload=createTodo.safeParse(createPayload);
    if(!parsePayload.success) {
        res.status(411).json({
            msg:"You sent the wrong inputs",
        })
        return;
    }

    await todo.create({
        title:createPayload.title,
        description:createPayload.description,
        completed:false
    })

    res.json({
        msg:"Todo Created"
    })
});

app.get("/todos", async(req,res)=> {
    const todos=await todo.find({});


});

app.put("./completed",async(req,res) => {
    const updatePayload=req.body;
    const parsePayload=updateTodo.safeParse(updatePayload);
    if(!parsePayload.success) {
        res.status(411).json({
            msg:"You sent wrong inputs"
        })
        return;
    }
    await todo.update({
        _id:req.body.id
    }, {
        completed:true
    }
)
})

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
