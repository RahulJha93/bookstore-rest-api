import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../services/userService.js';

// Register a new user
export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required.' });
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(409).json({ message: 'User already exists.' });
    const hash = await bcrypt.hash(password, 10);
    const user = await createUser({ email, password: hash });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    next(err);
  }
}

// Login and receive a JWT token
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required.' });
    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials.' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials.' });
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
}
