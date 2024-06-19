const Task = require('../models/Task');
const { format, parse } = require('date-fns');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

exports.authenticateUser = authenticateUser;

exports.getTasks = [authenticateUser, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}];

exports.getTaskById = [authenticateUser, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}];

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

exports.updateTask = [authenticateUser, async (req, res) => {
    const { title, description, status } = req.body;

    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}];

exports.deleteTask = [authenticateUser, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await Task.deleteOne({ _id: req.params.id });
        res.json({ message: 'Task removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}];
