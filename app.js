// app.js
import express from 'express';
import dotenv from 'dotenv';
import loginRouter from './routes/login.js';
import signUpRouter from './routes/signup.js';

dotenv.config();

const app = express();
app.use(express.json());

// Use the login router
app.use("/login", loginRouter);
app.use("/signup", signUpRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
