import { UserModel } from '../models/userModel.js';

export const UserController = {
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  },

  async getUserById(req, res) {
    try {
      const user = await UserModel.getUserById(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  },

  async createUser(req, res) {
    try {
      const id = await UserModel.createUser(req.body);
      res.status(201).json({ id, message: 'User created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create user' });
    }
  },

  async updateUser(req, res) {
    try {
      await UserModel.updateUser(req.params.id, req.body);
      res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update user' });
    }
  },

  async deleteUser(req, res) {
    try {
      await UserModel.deleteUser(req.params.id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  },
};
