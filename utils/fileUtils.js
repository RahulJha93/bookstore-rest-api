import fs from 'fs/promises';

// Read JSON file
export const readJsonFile = async (path) => {
  try {
    const data = await fs.readFile(path, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
};

// Write JSON file
export const writeJsonFile = async (path, data) => {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
};
