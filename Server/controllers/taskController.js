const Task = require('../models/Task');
const { format, parse } = require('date-fns');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Get all tasks
// exports.getTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find();
//         res.json(tasks);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// Get task by ID

exports.getTasks = [authenticateUser, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}];


exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new task

// exports.createTask = async (req, res) => {
//     const { title, description, status, created } = req.body;
//     const getUserDetails = req

//     if (!title || !status) {
//         return res.status(400).json({ message: 'Title and status are required' });
//     }

//     // Parse and reformat the created date if it exists
//     let formattedDate;
//     if (created) {
//         try {
//             const parsedDate = parse(created, 'dd/MM/yyyy', new Date());
//             formattedDate = format(parsedDate, 'dd/MM/yyyy'); // Ensure consistent format
//         } catch (error) {
//             return res.status(400).json({ message: 'Invalid date format' });
//         }
//     }

//     const newTask = new Task({
//         title,
//         description,
//         status,
//         created: formattedDate || format(new Date(), 'dd/MM/yyyy') // Use formatted date or current date
//     });

//     try {
//         const task = await newTask.save();
//         res.status(201).json(task);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };


exports.createTask = [authenticateUser, async (req, res) => {
    const { title, description, status, created } = req.body;
    if (!title || !status) {
        return res.status(400).json({ message: 'Title and status are required' });
    }

    let formattedDate;
    if (created) {
        try {
            const parsedDate = parse(created, 'dd/MM/yyyy', new Date());
            formattedDate = format(parsedDate, 'dd/MM/yyyy');
        } catch (error) {
            return res.status(400).json({ message: 'Invalid date format' });
        }
    }

    const newTask = new Task({
        title,
        description,
        status,
        created: formattedDate || format(new Date(), 'dd/MM/yyyy'),
        user: req.user.id // Associate task with the logged-in user
    });

    try {
        const task = await newTask.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}];

exports.updateTask = async (req, res) => {
    const { title, description, status } = req.body;

    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;

        const updatedTask = await task.save();
        res.json(updatedTask); // Make sure this is the last line to send the response
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a task

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        await Task.deleteOne({ _id: req.params.id });
        res.json({ message: 'Task removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
