const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['open', 'inprogress', 'done'],
        required: true
    },

    created: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('Task', TaskSchema);
