const express = require('express');
const { register, login } = require('../controllers/authController');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
], register);

router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty(),
], login);

router.get('/profile', authMiddleware, (req, res) => {
    // req.user berisi data dari token
    res.json({
        user: req.ueser,
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  });

module.exports = router;
