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
    getUserbyid,
    requestResetPassword,
    sendMailAPI,
    verifyOtpResetPassword,
    currentUser,
    logoutEJS,

} from '../Controller/userController';
import { refreshAccessToken } from '../midderwere/createToken';
import { authenticate, authenticateEJS, authorizeAdmin } from '../midderwere/midderwere';
import { uploadAvatarImg } from '../config/uploadsConfig';
import { validate, validateRegister } from '../dto/register.dto';


const router = express.Router();

//Router API
//authentication and authorization
router.post('/register', validateRegister, validate, register);
router.post('/login', login);
router.get('/currentuser', authenticate, currentUser);
router.post('/logout', authenticateEJS, logoutEJS);

//for user
router.put('/updateuser', authenticate, updateUser);
router.post('/updatepassword', authenticate, updatePassword);
router.post('/refreshToken', refreshAccessToken);
router.post('/uploadavatar', authenticate, uploadAvatarImg.single('avatar'), uploadAvatar);
router.get('/getUserbyId', authenticate, getUserbyid);

//do not check authenticate
router.post('/sendmail', sendMailAPI);
router.post('/requestOTP', requestResetPassword);
router.post('/verifyOTPResetPassword', verifyOtpResetPassword);

//Router EJS(render EJS)
router.post('/loginejs', loginejs);
router.get('/loginpage', renderLoginPage);
router.post('/updateuser/:id', authenticateEJS, authorizeAdmin, renderUpdateUserPage);
router.get('/userdetails/:id', authenticateEJS, authorizeAdmin, renderUserDetailsPage);
router.get('/', authenticateEJS, authorizeAdmin, renderListUsersPage);


export default router;