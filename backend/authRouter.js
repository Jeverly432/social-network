const Router = require('express');
const router = new Router();
const authController = require('./controllers/authController');
const {check} = require('express-validator');
const authMiddleware = require('./middleware/authMiddleware');
const roleMiddleware = require('./middleware/roleMiddleware');

router.post('/registration',[
  check('email', 'Email cannot be empty').notEmpty(),
  check('password', 'Password must be longer than 4 and less than 10 characters').isLength({min: 4, max: 10}),
  check('userName', 'Username cannot be empty').notEmpty(),
], authController.registration);
router.post('/login', authController.login);
router.get('/users', roleMiddleware(['ADMIN']), authController.getUsers);

module.exports = router;