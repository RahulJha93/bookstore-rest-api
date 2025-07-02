import { readJsonFile, writeJsonFile } from '../utils/fileUtils.js';
import { v4 as uuidv4 } from 'uuid';

// Path to users data file
const USERS_FILE = './data/users.json';

// Find user by email
export const findUserByEmail = async (email) => {
  const users = await readJsonFile(USERS_FILE);
  return users.find(u => u.email === email);
}

// Create new user
export const createUser = async ({ email, password }) => {
  const users = await readJsonFile(USERS_FILE);
  const user = { id: uuidv4(), email, password };
  users.push(user);
  await writeJsonFile(USERS_FILE, users);
  return user;
}

// Validate user credentials
export const validateUser = async (email, password) => {
  const users = await readJsonFile(USERS_FILE);
  return users.find(u => u.email === email && u.password === password);
}
