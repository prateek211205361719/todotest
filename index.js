

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
var { ObjectID } = require("mongodb");

const _ = require("lodash");

const keys = require('./server/config/keys');
const { Todo } = require('./server/models/todo');
mongoose.connect(keys.mongoURL);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/todos', async (req, res) => {
    try{
        var todoList = await Todo.find();
        if(todoList){
            res.send({todoList});
        }
    }catch(e){
        res.status(400).send(e.message);
    }
});

app.get('/todos/:id', async (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    try{
        var todo = await Todo.findById(id)
        if(!todo){
            return res.status(404).send();
        }
        res.send(todo);
    }catch(e){
        res.status(404).send(e);
    }

});

app.post('/todos',  async (req, res) => {
    try{
        var todo = new Todo(req.body);
        var newTodo = await todo.save();
        if(newTodo){
            res.send(newTodo);
        }
    }catch(e){
        res.status(400).send(e.message);
    }
});


app.patch('/todos/:id', async  (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;

    }
    try{
        var updatedTodo = await Todo.findByIdAndUpdate(id, {$set:body},{new :true});
        if(!updatedTodo){
            return res.status(404).send();
        }
        res.send(updatedTodo);
    }catch(e){
        res.status(400).send();
    }
   

});

app.delete('/todos/:id', async (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }
    try{
        var deleteTod = await Todo.findByIdAndRemove(id);
        console.log(deleteTod);
        if(!deleteTod){
            res.status(404).send();
        }
        res.send(deleteTod);
    }catch(e){
        res.status(404).send();
    }


});



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('---------running--------');
});