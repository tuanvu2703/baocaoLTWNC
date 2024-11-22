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
    verifyOtpResetPassword


} from '../Controller/userController';
import { refreshAccessToken } from '../midderwere/createToken';
import { authenticate, authenticateEJS, authorizeAdmin } from '../midderwere/midderwere';
import upload from '../config/uploadsConfig';
import { validate, validateRegister } from '../dto/register.dto';




const router = express.Router();

//Router API
router.post('/register',validateRegister, validate, register);
router.post('/login',login);
router.put('/updateuser', authenticate, updateUser);
router.post('/updatepassword', authenticate, updatePassword);
router.post('/refreshToken',refreshAccessToken);
router.post('/uploadavatar', authenticate, upload.single('avatar'), uploadAvatar);
router.get('/getUserbyId', authenticate, getUserbyid);
router.post('/sendmail', sendMailAPI);
router.post('/requestOTP', requestResetPassword);
router.post('/verifyOTPResetPassword', verifyOtpResetPassword);


//Router EJS(render EJS)
router.post('/loginejs',loginejs);
router.get('/loginpage', renderLoginPage );
router.get('/updateuser', authenticateEJS, authorizeAdmin, renderUpdateUserPage);
router.get('/userdetails/:id', authenticateEJS, authorizeAdmin, renderUserDetailsPage);
router.get('/listusers', authenticateEJS, authorizeAdmin, renderListUsersPage);


//Router EJS(render EJS)
router.get('/loginpage', renderLoginPage );
router.get('/updateuser', authenticateEJS, authorizeAdmin, renderUpdateUserPage);
router.get('/userdetails', authenticateEJS, authorizeAdmin, renderUserDetailsPage);
router.get('/listusers', authenticateEJS, authorizeAdmin, renderListUsersPage);



export default router;