import express from 'express';
import { login, register, updateUser, updatePassword,  } from '../Controller/userController';
import { refreshAccessToken } from '../midderwere/createToken';
import { authenticate, authorizeAdmin } from '../midderwere/midderwere';

const router = express.Router();

router.post('/register', register);
router.post('/login',login);
router.put('/updateuser', authenticate, updateUser);
router.post('/updatepassword', authenticate, updatePassword);
router.post('/refreshToken',refreshAccessToken);



export default router;