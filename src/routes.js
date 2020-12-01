const express = require('express');
const routes = express.Router();
const TaskController = require('../controllers/TaskController');
const UserController = require('../controllers/UserController');

routes.get('/', (req, res) => {
    console.log(`Receiving request of "/"`);
    return res.json({ message: "Ok, connected!" });
});

routes.post('/authUser', UserController.auth);

routes.post('/registerUser', UserController.store);

routes.get('/searchUser', UserController.search);

routes.get('/users', UserController.index);

routes.get('/user', UserController.findWithId);

routes.get('/tasks', TaskController.index);

routes.post('/addTask', TaskController.store);

routes.get('/searchTask', TaskController.search);

routes.delete('/deleteTask', TaskController.delete);

module.exports = routes;