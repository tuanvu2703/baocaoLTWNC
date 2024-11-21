import express from 'express';
import { login, register, updateUser, updatePassword,  } from '../Controller/userController';
import { refreshAccessToken } from '../midderwere/createToken';

const router = express.Router();

router.post('/register', register);
router.post('/login',login);
router.put('/updateuser',updateUser);
router.post('/updatepassword',updatePassword);
router.post('/refreshToken',refreshAccessToken);



export default router;