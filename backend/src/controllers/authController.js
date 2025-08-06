const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const login = async (req, res) => {
  try {
    const { token, user } = await authService.loginUser(req.body);
    res.json({ token, user });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await authService.getProfile(req.user.userId);
    res.json(profile);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
};
