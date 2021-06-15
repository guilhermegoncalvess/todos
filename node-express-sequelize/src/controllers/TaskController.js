const { update } = require('../models/Task');
const Task = require('../models/Task');

module.exports = {

    async listAll( request, response ) {
        // var  { completed } = request.query;
        var tasks = await Task.findAll();

        return response.json(tasks);
    },

    async listAllByStatus( request, response ) {
        const  { completed } = Boolean(request.params)

        console.log(completed)
        
        const tasks = await Task.findAll({ where: { completed } });

        console.log(tasks)

        return response.json(tasks);
    },

    async store(request, response) {
        const { title, completed } = request.body;

        const task = await Task.create({ title, completed });

        return response.json(task);
    },
    
    async update(request, response) {
        const { id } = request.params;
        const { title, completed  } = request.body;

        const task = await Task.findByPk(id);

        if(!task) {
            return response.status(400).json({ error: 'Task not found'});
        }

        if( title ) task.title = title; 
        task.completed = completed;

        await task.save();

        return response.json(task);
    },

    async delete(request, response) {
        const { id } = request.params;

        const task = await Task.findByPk(id);

        if(!task) {
            return response.status(400).json({ error: 'Task not found'});
        }

        await task.destroy();

        return response.json({message: 'Todo removido'});
    }
};