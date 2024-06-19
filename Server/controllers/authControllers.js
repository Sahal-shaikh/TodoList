const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRounds = 10;

// Register a new user
exports.signup = async (req, res) => {
    const { username, email, password, phone, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            phone,
            role
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




// exports.login = async (req, res) => {
//     const { email, password } = req.body;
//     const secretKey = process.env.SECRET_KEY;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'User does not exist' });
//         }

//         const match = await bcrypt.compare(password, user.password);
//         if (!match) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, secretKey, { expiresIn: '1h' });

//         // Create a user object without the password to send back
//         const userResponse = {
//             id: user._id,
//             username: user.username,
//             email: user.email,
//             phone: user.phone,
//             role: user.role,
//         };

//         res.status(200).json({ message: 'Login successful', token, user: userResponse });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const secretKey = process.env.SECRET_KEY;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, secretKey, { expiresIn: '1h' });

        const userResponse = {
            id: user._id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            role: user.role,
        };

        res.status(200).json({ message: 'Login successful', token, user: userResponse });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};