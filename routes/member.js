const router = require('express').Router();
const { memberController: controller } = require('../controllers');

router.post('/signup', controller.SignUp);

router.post('/signin', controller.SignIn);

router.post('/overlap', controller.ID_Check);

router.post('/hpcheck', controller.AuthSMS);

module.exports = router;
