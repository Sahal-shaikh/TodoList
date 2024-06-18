require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/task');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
