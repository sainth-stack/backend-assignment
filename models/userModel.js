import db from '../config/db.js';

export const UserModel = {
  async getAllUsers() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  },

  async getUserById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  async createUser(user) {
    const { name, email } = user;
    const [result] = await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    return result.insertId;
  },

  async updateUser(id, user) {
    const { name, email } = user;
    await db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
  },

  async deleteUser(id) {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
  },
};
