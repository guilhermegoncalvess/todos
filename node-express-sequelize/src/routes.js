const { response } = require('express');
const express = require('express');

const TodoController = require('./controllers/TodoController')

const routes = express.Router();

routes.get('/todos', TodoController.listAll);

routes.get('/todos/completed', TodoController.listAllCompleted);

routes.get('/todos/active', TodoController.listAllActive);

routes.post('/todos', TodoController.store);

routes.put('/todos/:id', TodoController.update);

routes.delete('/todos/:id', TodoController.delete);


module.exports = routes;