import express from 'express'
const router= express.Router()

import UserController from '../controllers/user.controllers.js'

router.post('/register', UserController.UserRegister);
router.post('/login', UserController.userLogin);



export default router;

