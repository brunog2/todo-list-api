const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const server = express();
const port = process.env.PORT || 8080;
const uri = "mongodb://todoList:todoList@cluster0-shard-00-00.vochj.mongodb.net:27017,cluster0-shard-00-01.vochj.mongodb.net:27017,cluster0-shard-00-02.vochj.mongodb.net:27017/todo?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(
    uri,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

server.use(cors());
server.use(express.json());
server.use(routes)
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})