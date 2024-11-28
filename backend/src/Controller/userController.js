import * as userModel from '../model/userModel';
import { generateToken, refreshAccessToken } from '../midderwere/createToken';
import bcrypt from 'bcrypt';
import { sendMail } from '../config/sendmail';
import crypto from 'crypto';




// ===================================================API=====================================================================
const register = async (req, res) => {
  try {
    const { username, password, fullname, gender, born, email, address } = req.body;

    if (!username && !email) {
      return res.status(400).json({ message: 'You must provide either a username or an email.' });
    }
    if (username) {
      const isUsernameExists = await userModel.checkUsernameExists(username);
      if (isUsernameExists) {
        return res.status(400).json({ message: 'Username already exists.' });
      }
    }
    if (email) {
      const isEmailExists = await userModel.checkEmailExists(email);
      if (isEmailExists) {
        return res.status(400).json({ message: 'Email already exists.' });
      }
    }

    await userModel.register(username || null, password, fullname, gender, born, email || null, address);
    res.status(201).json({ message: 'Register successfully' });
  } catch (error) {
    console.error('Error occurred in register controller:', error);

    res.status(500).json({ message: 'Internal server error' });
  }
};



const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await userModel.login(identifier, password);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isActive !== 1) {
      return res.status(403).json({ message: 'Your account is not active. Please contact support.' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.render('login', { error: 'Password is correct.' });
    }
    const tokens = await generateToken(user.id, res);

    req.session.username = user.username;
    req.session.user = user;

    console.log(user.username);

    res.status(200).json({
      message: 'Login successful',
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      role: user.role, 
      username: user.username,
      avatar: user.avatar,
    });
  } catch (error) {
    console.log('Error:', error);
    res.status(401).json({ message: 'Invalid email/username or password' });
  }
};


const currentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//update user current()
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

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await userModel.findUserByIdentifier(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.OTPEXPRIES < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired.' });
    }

    const hashedOtp = crypto.createHash('sha256', process.env.OTP_SECRET).update(otp).digest('hex');
    if (hashedOtp !== user.OTP) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    // Nếu OTP hợp lệ, trả về thành công
    res.status(200).json({ message: 'OTP is valid.' });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ message: 'An error occurred while processing your request.' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await userModel.resetPassword(email, password);
    if (result) {
      return res.status(200).json({ message: 'Password reset successfully.' });
    } else {
      return res.status(500).json({ message: 'Failed to reset password.' });
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ message: 'An error occurred while processing your request.' });
  }
};

const activeUser = async(req,res) => {
  try {
    const { userId } = req.body
    const result = await userModel.activeUser(userId)
    console.log(userId);
    res.redirect(`/user/userdetails/${ userId }`);
  } catch (error) {
    console.log('error from usercontroller: ActiveUser');
    return res.status(500).json({ message: 'An error occurred while processing your request.' });
  }
}


// =========================================EJS RENDER PAGE===================================================================

const loginejs = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await userModel.login(identifier, password);

    // Kiểm tra nếu tài khoản không hoạt động
    if (user.isActive !== 1) {
      return res.render('login', {
        error: 'Your account is not active. Please contact support.',
        username: identifier,
      });
    }

    // Kiểm tra mật khẩu
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.render('login', {
        error: 'Invalid password. Please try again.',
        username: identifier,
      });
    }
    console.log(user.username);

    if (user.role === 0) {

    const token = await generateToken(user.id, res);
    req.session.username = user.username;
    req.session.user = user;
      return res.redirect('http://localhost:3001/');
    } else if (user.role === 1) {
      return res.redirect('http://localhost:3000/login');
    } else {
      return res.render('login', {
        error: 'Invalid role. Please contact support.',
        username: identifier,
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'An error occurred during login' });
  }
};



const updatePassword = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy userId từ yêu cầu (thường là từ token)
    const { oldPassword, newPassword } = req.body; // Lấy mật khẩu cũ và mới từ body của yêu cầu

    // Tìm người dùng trong cơ sở dữ liệu
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // So sánh mật khẩu cũ với mật khẩu đã băm trong cơ sở dữ liệu
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    // Cập nhật mật khẩu mới
    await userModel.updatePassword(userId, newPassword);

    // Trả về phản hồi thành công
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.log('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



const renderUpdateUserPage = async (req, res) => {
  try {
    const id = req.params.id;
    const { fullname, gender, born, email, address, phone } = req.body;
    const user = await userModel.updateUser(id, fullname, gender, born, email, address, phone);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.redirect(`/user/userdetails/${id}`);
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
    res.render('index',
      {
        title: "Detail User",
        page: "detailUser",
        user
      });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const renderListUsersPage = async (req, res) => {
  try {
    const users = await userModel.getListUser();
    // console.log('users:', users);
    res.render('index', {
      title: "User",
      page: "listUser",
      users
    });
  } catch (error) {
    console.log('Error:', error);
    // res.status(500).json({ message: 'Internal server error' });
  }
};


const InsertUser = async (req, res) => {
  if (req.method === "GET") {
      res.render('index',
          {
              title: "inserUser",
              page: "insertUser"
          }
      )
  }
  if (req.method === "POST") {

      const html = `<h1>The accout is insert for admin</h1>
        <p>This is your account <strong>< ${email} </strong><, please do not share it with anyone.</p>
        <p>Password:<strong> ${password} </strong><.</p>
        <p>OTP: <strong>${otp}</strong></p>`;

      const { email, password } = req.body
      const result = await userModel.InserUser(email, password)
      await sendMail(email,html)

      req.session.message = "Insert User created successfully!";
      res.redirect("/user");
  }
}

// const InsertUser = async(req,res) => {
//   try {
//     res.render()
//     const {email, password} = req.body

//     const user  = await userModel.InserUser(email, password)
//     res.redirect('/user')
//   } catch (error) {
//     console.log('error from userController', error);
//   }
// }


const renderLoginPage = (req, res) => {
  try {
    res.render('login');
  } catch (error) {
    console.log('error in rederlogin page controllerUSer:', error);
  }

};

const logoutEJS = (req, res) => {

  req.session.destroy((error) => {
    if (error) {
      console.log('Error destroying session:', error);
      return res.status(500).json({ message: 'Failed to log out' });
    }
    res.clearCookie('token');
    res.redirect('/');
  });
};

const logout = (req, res) => {
  req.session.destroy();
  req.cookies.destroy();
}


export {

  //api

  register,
  login,
  updatePassword,
  uploadAvatar,
  getUserbyid,
  requestResetPassword,
  sendMailAPI,
  verifyOtp,
  resetPassword,
  // verifyOtpResetPassword,
  currentUser,
  activeUser,
  InsertUser,

  //ejs
  updateUser,
  renderUpdateUserPage,
  renderUserDetailsPage,
  renderListUsersPage,
  renderLoginPage,
  loginejs,
  logoutEJS,
  logout,

}