
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://tusinghar:sqSv9wKtjMAe3@cluster0.pt2g1qa.mongodb.net/TodoList");

//create new todo schema
const todoSchema = new mongoose.Schema({
    title : String,
    description : String,
    status : Boolean
});
const allTodos = mongoose.model('allTodos',todoSchema);

module.exports = {
    allTodos
};

