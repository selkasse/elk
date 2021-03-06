const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');



const {catchErrors} = require('../handlers/errorHandlers');

// * Do work here
router.get('/', homeController.homePage);
router.get('/inventory', authController.isLoggedIn, homeController.addInventory);
router.post('/inventory', catchErrors(homeController.createInventory));


router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);

// * 1. Validate the registration data
// * 2. Register the user
// * 3. Log them in
router.post('/register', 
    userController.validateRegistration,
    userController.register, 
    authController.login
);

router.get('/logout', authController.logout);

router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));
router.post('/account/forgot', catchErrors(authController.forgot));

router.get('/account/reset/:token', authController.reset);
router.post('/account/reset/:token', authController.confirmedPasswords, catchErrors(authController.update));

module.exports = router;