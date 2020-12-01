const { Schema, model } = require('mongoose');

const TaskSchema = new Schema ({
    userId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: true,
    },
});

module.exports = model('Task', TaskSchema);