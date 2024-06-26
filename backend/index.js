const express = require("express");
const app = express();
const cors = require('cors');
const allTodos = require("./database.js").allTodos;
const createTodo = require("./validation.js").createTodo;
app.use(express.json());
app.use(cors());
app.get('/todos',async function(req,res){
    const todos = await allTodos.find({});
    res.status(200).json({
        list:todos
    });
    return;
});
app.post('/addTodo',async function(req,res){
    const sample = req.body;
    const check = createTodo.safeParse(sample);
    if(!check.success){
        res.status(404).json({
            msg : "wrong inputs"
        });
        return;
    }
    await allTodos.create(sample);
    const todos = await allTodos.find({});
    res.status(200).json({
        list:todos
    });
    return;
});
app.listen(3000);
