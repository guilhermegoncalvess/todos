const { update } = require('../models/Todo');
const Todo = require('../models/Todo');

module.exports = {

    async listAll( request, response ) {
        // var  { completed } = request.query;
        var todos = await Todo.findAll();

        return response.json(todos);
    },

    async listAllCompleted( request, response ) { 
        const todos = await Todo.findAll({ where: { completed: true } });

        return response.json(todos);
    },

    async listAllActive( request, response ) { 
        const todos = await Todo.findAll({ where: { completed: false } });

        console.log(todos)

        return response.json(todos);
    },

    async store(request, response) {
        const { title, completed } = request.body;

        const todo = await Todo.create({ title, completed });

        return response.json(todo);
    },
    
    async update(request, response) {
        const { id } = request.params;
        const { title, completed  } = request.body;

        const todo = await Todo.findByPk(id);

        if(!todo) {
            return response.status(400).json({ error: 'Todo not found'});
        }

        if( title ) todo.title = title; 
        todo.completed = completed;

        await todo.save();

        return response.json(todo);
    },

    async delete(request, response) {
        const { id } = request.params;

        const todo = await Todo.findByPk(id);

        if(!todo) {
            return response.status(400).json({ error: 'Todo not found'});
        }

        await todo.destroy();

        return response.json({message: 'Todo removed'});
    }
};