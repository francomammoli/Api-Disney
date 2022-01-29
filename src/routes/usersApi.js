const {Router} = require('express');
const router = Router();

const authtoken = require('../middleware/authToken');

//require controller
const userController = require('../controllers/usersApi');

router.post('/register',userController.register);
router.post('/login',authtoken,userController.login);

module.exports = router;