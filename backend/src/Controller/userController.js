import * as userModel from '../model/userModel';
import { generateToken, refreshAccessToken } from '../midderwere/createToken';




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

    //ejs
    updateUser,
    renderUpdateUserPage,
    renderUserDetailsPage,
    renderListUsersPage,
    renderLoginPage,
    loginejs,

}