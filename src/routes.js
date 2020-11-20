const express = require('express');
const routes = express.Router();
const TaskController = require('../controllers/TaskController');

routes.get('/', (req, res) => {
    console.log(`Receiving request of "/"`);
    return res.json({ message: "Ok, connected!" });
});

routes.get('/tasks', TaskController.index);

routes.post('/addTask', TaskController.store);

routes.get('/searchTask', TaskController.search);

module.exports = routes;