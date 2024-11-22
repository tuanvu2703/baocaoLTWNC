import express from 'express';
import { 
    login, 
    register, 
    updateUser, 
    updatePassword,  
    renderUpdateUserPage,
    renderListUsersPage,
    renderUserDetailsPage,
    renderLoginPage,
    loginejs,
    uploadAvatar,

} from '../Controller/userController';
import { refreshAccessToken } from '../midderwere/createToken';
import { authenticate, authenticateEJS, authorizeAdmin } from '../midderwere/midderwere';
import upload from '../config/uploadsConfig';

const router = express.Router();

//Router API
router.post('/register', register);
router.post('/login',login);
router.put('/updateuser', authenticate, updateUser);
router.post('/updatepassword', authenticate, updatePassword);
router.post('/refreshToken',refreshAccessToken);
router.post('/uploadavatar', authenticate, upload.single('avatar'), uploadAvatar);


//Router EJS(render EJS)
router.post('/loginejs',loginejs);
router.get('/loginpage', renderLoginPage );
router.get('/updateuser', authenticateEJS, authorizeAdmin, renderUpdateUserPage);
router.get('/userdetails/:id', authenticateEJS, authorizeAdmin, renderUserDetailsPage);
router.get('/listusers', authenticateEJS, authorizeAdmin, renderListUsersPage);



export default router;