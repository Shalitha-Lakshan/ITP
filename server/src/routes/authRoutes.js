const express = require('express');
const { body } = require('express-validator');
const { authRequired } = require('../middleware/auth');
const authController = require('../controllers/authController');

const router = express.Router();

router.post(
  '/register',
  [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })],
  authController.register
);

router.post('/login', [body('email').isEmail(), body('password').notEmpty()], authController.login);

router.get('/me', authRequired, authController.me);

module.exports = router;