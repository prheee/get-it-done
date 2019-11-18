const db = require('./db.js');

const todoController = {};

// controller to get todo list in db onload
todoController.getTodoList = (req, res, next) =>{
  // query all data from db
  db.query('SELECT * FROM todo ORDER BY id')
    .then(data => {
      // save it to res.locals to send it back to client
      res.locals.data = data.rows;
      next();
    })
    .catch(err => console.log('error loading the data...'))
}

// controller to add todo item in db
todoController.addTodo = (req, res, next) => {
  // grab data to add from req.body
  const { task, date, completion } = req.body;
  // insert query to add a new record to the db
  db.query('INSERT INTO todo(task, date, completion) VALUES ($1, $2, $3) RETURNING *', [task, date, completion])
    .then(data => {
      next()
    })
    .catch(err => console.log('error when adding data...'))
}

// once date updated / added, query the latest item to send back to client
todoController.getRecentId = (req, res, next) => {
  db.query('SELECT * FROM todo ORDER BY ID DESC LIMIT 1')
    .then(data => {
      res.locals.data = data.rows;
      next()
    })
    .catch(err => console.log('error when grabbing recently added todo...'))
}

// controller to delete a todo item
todoController.deleteTodo = (req, res, next) => {
  // use the id sent from client to perform an delete query
  const { id } = req.body;
  db.query('DELETE FROM todo WHERE id = $1', [id])
    .then(data => {
      next();
    })
    .catch(err => console.log('error when deleting data...'))
}

// controller to edit a todo item including date changes
todoController.editTodo = (req, res, next) => {
  // grab the id and task sent from client
  const { id, task, date } = req.body;
  // update the db with update query
  db.query(`UPDATE todo SET task = $1, date = $2 WHERE id = $3`, [task, date, id])
    .then(data => {
      next();
    })
    .catch(err => console.log('error when updating data...'))
}

todoController.checkTodo = (req, res, next) => {
  const { id, completion } = req.body;
  // update the db with update query
  db.query(`UPDATE todo SET completion = $2 WHERE id = $1`, [id, completion])
    .then(data => {
      next();
    })
    .catch(err => console.log('error when updating data...'))
}

module.exports = todoController;