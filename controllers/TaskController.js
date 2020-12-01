const Task = require('../models/Task');

module.exports = {
    async index(req, res) {
        console.log('Listing tasks...');
        const { userId } = req.query;
        const tasks = await Task.find({ userId: userId }).then(response => {
            return res.json(response);
        });
    },

    async search(req, res) {
        const { keywords, userId } = req.query;        
        console.log('Searching for tasks with keywords: ', keywords);

        const result = await Task.find({ userId: userId, description: { $regex: new RegExp(keywords, 'i') } }).then(response => {
            return res.json(response);
        });
    },

    async delete(req, res) {
        console.log(req.body)
        const { taskId } = req.body;
        console.log('Deleting task with id: ', taskId);

        await Task.deleteOne({ _id: taskId }).then(response => {
            return res.json({ message: "Task deleted with success!" })
        });
    },

    async store(req, res) {
        let taskExists = await Task.find({ description: req.body.description });
        if (taskExists.length != 0) {
            return res.json({ message: "Task already exists!" })
        }
        const task = await Task.create({
            userId: req.body.userId,
            description: req.body.description,
            priority: req.body.priority,
            done: req.body.done
        });

        return res.json({ message: "Task registered with success!" });
    }
};