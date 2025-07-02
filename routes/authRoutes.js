import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Register a new user
router.post('/register', register);
// Login and get JWT
router.post('/login', login);

export default router;
