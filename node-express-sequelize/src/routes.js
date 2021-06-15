const { response } = require('express');
const express = require('express');

const TaskController = require('./controllers/TaskController')

const routes = express.Router();

routes.get('/tasks', TaskController.listAll);

// routes.get('/tasks/:completed', TaskController.listAllByStatus);

routes.post('/tasks', TaskController.store);

routes.put('/tasks/:id', TaskController.update);

routes.delete('/tasks/:id', TaskController.delete);


module.exports = routes;