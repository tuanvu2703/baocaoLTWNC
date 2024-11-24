import * as userModel from '../model/userModel';
import { generateToken, refreshAccessToken } from '../midderwere/createToken';
import bcrypt from 'bcrypt';
import { sendMail } from '../config/sendmail';
import crypto from 'crypto';


// ===================================================API================================================================
const register = async(req,res) => {
    try {
        const {username, password, fullname, gender, born, email, address} = req.body;
        await userModel.register(username, password, fullname, gender, born, email, address)
        res.status(200).json({message: 'register seccesfully', data: req.body})
    } catch (error) {
        console.log('lỗi gì đó không biếc:', error);
    }
}

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await userModel.login(identifier, password);

    if(user.isActive !== 1){
      return res.status(403).json({message: 'Your account is not active. Please contact support.'})
    }
    const tokens = await generateToken(user.id,res);
    // Đặt thông tin người dùng vào session
    req.session.username = user.username;
    req.session.user = user;
    console.log(user.username);

    res.status(200).json({ message: 'Login successful', ...tokens });
  } catch (error) {
    console.log('Error:', error);
    res.status(401).json({ message: 'Invalid email/username or password' });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { fullname, gender, born, email, address, phone } = req.body;
    await userModel.updateUser(userId, fullname, gender, born, email, address, phone);
    res.status(200).json({ message: 'User updated successfully', data: req.body });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const userId = req.user.id;
    const avatar = req.file ? `uploads/avatar/${req.file.filename}` : null;
    await userModel.uploadAvatar(userId, avatar);
    res.status(200).json({ message: 'Avatar uploaded successfully', avatar });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserbyid = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    return res.status(200).json(user);
  } catch (error) {
    console.log('idont know what error:', error);
  }
}

const requestResetPassword = async (req, res) => {
  const { email } = req.body;
  const otpExpiration = parseInt(process.env.OTP_EXPIRATION)
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
  const hashOtp = await crypto.createHash('sha256', process.env.OTP_SECRET).update(otp).digest('hex');
  const otpExpires = Date.now() + otpExpiration;
  const html = `<h1>Reset your password</h1>
    <p>This is the code to reset your password, please do not share it with anyone.</p>
    <p>If you do not require this function, please quickly change the password for your account.</p>
    <p>OTP: <strong>${otp}</strong></p>`;
                
  try {
      await userModel.updateOTP(email, hashOtp, otpExpires);
      await sendMail(email, html);
      res.status(200).json({ message: 'OTP has been sent to your email.' });
  } catch (error) {
      console.error(`Error sending email to ${email}: ${error}`);
      res.status(500).json({ message: 'Failed to send OTP email.' });
  }
};

  const sendMailAPI = async (req, res) => {
    const { email, html } = req.body;
    await sendMail(email, html);
    res.status(200).json({ message: 'Email sent successfully' });
  }
  const verifyOtpResetPassword = async (req, res) => {
    try {
      const { email, otp, password } = req.body;

      const user = await userModel.findUserByIdentifier(email);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      
      if (user.OTPEXPRIES < Date.now()) {

        
        return res.status(400).json({ message: 'OTP has expired.' });
      }

      const hashedOtp = crypto.createHash('sha256', process.env.OTP_SECRET).update(otp).digest('hex');
      if (hashedOtp !== user.OTP) {
        console.log('database:',user.OTP, 'otp:', hashedOtp);
        return res.status(400).json({ message: 'Invalid OTP.' });
      }
  
      const result = await userModel.resetPassword(email, password);
      if (result) {
        return res.status(200).json({ message: 'Password reset successfully.' });
      } else {
        return res.status(500).json({ message: 'Failed to reset password.' });
      }
      
    } catch (error) {
      console.log('Error during OTP verification:', error);
      return res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
  };
  
  

// =========================================EJS RENDER PAGE===================================================== 

const loginejs = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await userModel.login(identifier, password);

    // Kiểm tra nếu tài khoản không hoạt động
    if (user.isActive !== 1) {
      return res.status(403).json({ message: 'Your account is not active. Please contact support.' });
    }
    const tokens = await generateToken(user.id, res);
    // Đặt thông tin người dùng vào session
    req.session.username = user.username;
    req.session.user = user;
    console.log(user.username);
    res.redirect('/user/listusers');
  } catch (error) {
    console.log('Error:', error);
    res.status(401).json({ message: 'Invalid email/username or password' });
  }
};

  const updatePassword = async (req, res) => {
    try {
      const userId = req.user.id; 
      const { oldPassword, newPassword } = req.body;
  
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Old password is incorrect' });
      }
      await userModel.updatePassword(userId, newPassword);
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const renderUpdateUserPage = async (req, res) => {
    try {
      const userId = req.user.id; // Lấy ID người dùng từ req.user
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.render('updateUser', { user });
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const renderUserDetailsPage = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // const formatDate = (date) => {
      //   const d = new Date(date);
      //   const day = (`0${d.getDate()}`).slice(-2);
      //   const month = (`0${d.getMonth() + 1}`).slice(-2);
      //   const year = d.getFullYear();
      //   return `${day}/${month}/${year}`;
      // };
      // user.born = formatDate(user.born);
      res.render('detailUser', { user });
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const renderListUsersPage = async (req, res) => {
    try {
      const users = await userModel.getListUser();
      res.render('listUser', { users });
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const renderLoginPage = (req, res) => {
    res.render('login');
  };



export {

  //api

    register,
    login,
    updatePassword,
    uploadAvatar,
    getUserbyid,
    requestResetPassword,
    sendMailAPI,
    verifyOtpResetPassword,

    //ejs
    updateUser,
    renderUpdateUserPage,
    renderUserDetailsPage,
    renderListUsersPage,
    renderLoginPage,
    loginejs,

}