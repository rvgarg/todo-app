const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Router = express.Router();
const port = 4000;

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log('connection to database is established....');
});

Router.route('/').get(function (req, res) {
    Todo.find(function (err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

Router.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Todo.findById(id, function (err, todo) {
        if (err) {
            console.log(err);
        } else {
            res.json(todo);
        }
    });
});

Router.route('/update/:id').post(function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (!todo) {
            res.status(404).send("data not found");
        } else {
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json("todo updated!!!");
            }).catch(err => {
                res.status(404).send("Update not possible !!");
            });
        }
    });
});

Router.route('/add').post(function (req, res) {
    let todo = Todo(req.body);
    todo.save().then(todo => {
        res.status(200).json({ 'todo': 'todo added successfully' });
    }).catch(err => {
        res.status(404).send("todo addition failed!!");
    })
});

app.use('/todo', Router);


app.listen(port, function () {
    console.log(`Server is running at ${port}`);
});