// routes/signup.js
import express from 'express';
import { createUser, editUser, deleteOneUser } from '../models/signup.js';

const router = express.Router();

// Route to create a new user
router.post("/", async (req, res) => {
    try {
        const newUser = req.body;
        const createdUser = await createUser(newUser);
        res.status(201).json(createdUser);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Route to edit user details
router.patch("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = req.body;
        const result = await editUser(id, updatedUser);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result); // User not found
        }
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Route to delete a user by ID
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteOneUser(id);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result); // User not found
        }
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

export default router;
