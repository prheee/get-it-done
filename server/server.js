const express = require('express');
const path = require('path');
const PORT = 3535;

const todoController = require('./todoController')

// using express middleware
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve static files including build file and css
app.use('/', express.static(path.join(__dirname, '../dist')))

// basic html serve on '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// serving data from the db on app load
app.get('/todo', todoController.getTodoList, (req, res) => {
  res.status(200).json(res.locals.data);
})

// posting new todo item in to db
app.post('/todo', todoController.addTodo, todoController.getRecentId, (req, res) => {
  res.status(200).json(res.locals.data);
})

// deleting an existing todo item
app.delete('/todo', todoController.deleteTodo, (req, res) => {
  res.status(200)
})

// updating a todo item
app.patch('/todo', todoController.editTodo, (req, res) => {
  res.status(200)
})

app.patch('/mark', todoController.checkTodo, (req, res) => {
  res.status(200)
})

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`)
})

module.exports = app;