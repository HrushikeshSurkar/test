// models/signup.js
import pool from '../db/db.js';

// Create a new user
export async function createUser(user) {
    try {
        const result = await pool.query('INSERT INTO users SET ?', user);
        return { success: true, data: { id: result.insertId, ...user } };
    } catch (error) {
        console.error(error.stack);
        return { success: false, error: 'Error creating user.' };
    }
}

// Edit user details
export async function editUser(id, updatedUser) {
    try {
        // Check if the user with the specified ID exists
        const [existingUser] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

        if (!existingUser) {
            return { success: false, error: 'User not found' };
        }

        // Log the updated user data
        console.log('Updated user data:', updatedUser);

        // Update the user details
        const result = await pool.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id]);

        // Check the affected rows
        if (result.affectedRows === 0) {
            return { success: false, error: 'Failed to update user' };
        }

        // Return the updated user details
        const [updatedUserData] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        return { success: true, data: updatedUserData[0] };
    } catch (error) {
        console.error(error.stack);
        return { success: false, error: 'Error updating user.' };
    }
}
// Delete a user by ID
export async function deleteOneUser(id) {
    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

        if (existingUser.length === 0) {
            return { success: false, error: 'User not found' };
        }

        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        return { success: true, data: { id, message: 'User deleted successfully' } };
    } catch (error) {
        console.error(error.stack);
        return { success: false, error: 'Error deleting user.' };
    }
}
