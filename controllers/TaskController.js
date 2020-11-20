const Task = require('../models/Task');
module.exports = {
    async index(req, res) {
        console.log('Listing tasks...');
        const tasks = await Task.find({}).then(response => {
            return res.json(response);
        });
    },

    async search(req, res) {
        const {keywords} = req.query;
        console.log('Searching for tasks with keywords: ', keywords);

        const result = await Task.find({description: {$regex: new RegExp(keywords, 'i')}}).then(response => {
            return res.json(response);
        });
    },

    async delete(req, res) {
        const {taskDescription} = req.query;
        console.log('Deleting task with description: ', taskDescription);

        const newTasks = await Task.deleteOne({ description: taskDescription });
    },

    async store(req, res) {
        let taskExists = await Task.find({description: req.body.description});
        if (taskExists.length != 0){
            return res.json({message: "Task already exists!"})
        }
        const task = await Task.create({
            description: req.body.description,
            priority: req.body.priority,
            done: req.body.done
        });
        
        return res.json({message: "Task registered with success!"});
    }
};