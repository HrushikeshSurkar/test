// api/routes/login.js
import express from 'express';
import { getAllUsers, getOneUser } from '../models/login.js';

const loginRouter = express.Router();

// Middleware to handle unexpected HTTP methods
loginRouter.all("/", (req, res, next) => {
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method Not Allowed' });
    } else {
        next();
    }
});

// Route to get all users
loginRouter.get("/", async (req, res) => {
    try {
        const users = await getAllUsers();
        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ error: 'User Table is Empty' });
        }
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get a specific user by ID
loginRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await getOneUser(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: `User not found with id ${id}` });
        }
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default loginRouter;
