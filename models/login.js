// api/models/login.js
import pool from '../db/db.js';

// Get all users from the database
export async function getAllUsers() {
    try {
        const [users] = await pool.query("SELECT * FROM users");
        return users;
    } catch (error) {
        console.error(error.stack);
        throw new Error('Error fetching users from the database.');
    }
}

// Get a specific user by ID from the database
export async function getOneUser(id) {
    try {
        const [user] = await pool.query(`
        SELECT *
        FROM users
        WHERE id = ?`, [id]);
        return user[0];
    } catch (error) {
        console.error(error.stack);
        throw new Error('Error fetching user from the database.');
    }
}
