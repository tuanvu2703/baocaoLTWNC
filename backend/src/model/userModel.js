
import connection from "../DB/connectDB";
import bcrypt from "bcrypt";
import moment from "moment-timezone";
//(id, username, password, fullname, gender, born, email, address, phone, avatar, role)



const checkUsernameExists = async (username) => {
  const [result] = await connection.execute(
    'SELECT * FROM `users` WHERE `username` = ?',
    [username]
  );
  return result.length > 0; // Trả về true nếu tồn tại
};

const checkEmailExists = async (email) => {
  const [result] = await connection.execute(
    'SELECT * FROM `users` WHERE `email` = ?',
    [email]
  );
  return result.length > 0; // Trả về true nếu tồn tại
};


const register = async (username, password, fullname, gender, born, email, address) => {
  try {
    const [userExit] = await connection.execute(
      'SELECT * FROM `users` WHERE username = ?', [username])
    const hashPassword = await bcrypt.hash(password, 10)
    const formattedBorn = moment(born, 'DD-MM-YYYY').format('YYYY-MM-DD');
    const [result] = await connection.execute(
      'INSERT INTO users (username, password, fullname, gender, born, email, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [username, hashPassword, fullname, gender, formattedBorn, email, address]
    );
    return result;
  } catch (error) {
    console.log('lỗi gì đó không biết: ', error);
    throw error;
  }
}

const findUserByIdentifier = async (identifier) => {
  const [rows] = await connection.execute(
    'SELECT * FROM users WHERE email = ? OR username = ?',
    [identifier, identifier]
  );
  return rows[0];
};

const findById = async (userId) => {
  const [rows] = await connection.execute(
    'SELECT * FROM users WHERE id = ?',
    [userId]

  );
  return rows[0];
};

const updateRefreshToken = async (userId, refreshToken) => {
  await connection.execute(
    'UPDATE users SET refreshToken = ? WHERE id = ?',
    [refreshToken, userId]
  );
};

const login = async (identifier, password) => {
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [identifier, identifier]
    );
    // console.log(rows[0]);
    return rows[0];
  } catch (error) {
    console.log('i do not know what error', error);
  }
};

const updateUser = async (id, fullname, gender, born, email, address, phone) => {
  try {
    // Kiểm tra xem người dùng có tồn tại không
    const [user] = await connection.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );

    if (user.length === 0) {
      throw new Error('User not found');
    }

    // Chuyển đổi born từ 'DD-MM-YYYY' sang 'YYYY-MM-DD'
    const formattedBorn = moment(born, 'DD/MM/YYYY', true).isValid()
      ? moment(born, 'DD/MM/YYYY').format('YYYY-MM-DD')
      : born; // Giữ nguyên nếu không hợp lệ

    // Thực hiện cập nhật
    const [result] = await connection.execute(
      'UPDATE users SET fullname = ?, gender = ?, born = ?, email = ?, address = ?, phone = ? WHERE id = ?',
      [fullname, gender, formattedBorn, email, address, phone, id]
    );

    return result;
  } catch (error) {
    console.error('Lỗi khi cập nhật user: ', error.message);
    throw error;
  }
};

const updatePassword = async (userId, newPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [result] = await connection.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, userId]
    );
    return result;
  } catch (error) {
    console.log('Error updating password:', error);
    throw error;
  }
};

const getListUser = async () => {
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM users'
    )
    return rows;
  } catch (error) {
    console.log('this bug userModel check its:', error);
  }
}

const activeUser = async (id) => {
  try {

    const user = await findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    const newIsActive = user.isActive === 1 ? 0 : 1;
    const result = await connection.execute(
      'UPDATE users SET isActive = ? WHERE id = ?',
      [newIsActive, id]
    );
    return result;
  } catch (error) {
    console.log('Error:', error);
  }
}
const uploadAvatar = async (userId, avatar) => {
  try {
    const [result] = await connection.execute(
      'UPDATE users SET avatar = ? WHERE id = ?',
      [avatar, userId]
    );
    return result;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

const updateOTP = async (email, otp, expries) => {
  try {
    const expiresDateTime = moment(expries).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
    const [result] = await connection.execute(
      'UPDATE users SET OTP = ?, OTPEXPRIES =? WHERE email = ?',
      [otp, expiresDateTime, email]
    );
    return result;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
}
const resetPassword = async (email, newPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [result] = await connection.execute(
      'UPDATE users SET password = ?, OTP = NULL, OTPEXPRIES = NULL  WHERE email = ?',
      [hashedPassword, email]
    );
    return result;
  } catch (error) {
    console.log('Error:', error);
    throw error

  }
};
const InserUser = async(email, password) => {
  try {
    const userExiting = await findUserByIdentifier(email)
    if(!userExiting){
      throw new error('Email is Exit, please try agian')
    }
      const result = await connection.execute(
        'INSERT INTO users(email, password) VALUES(?, ?)', [email,password]
      )
      return result
  } catch (error) {
    console.log('error from userModel: ',error);
  }
}

// const activeUser = async (id) => {
//   try {
//     // Tìm người dùng theo ID
//     const [rows] = await connection.execute('SELECT isActive FROM users WHERE id = ?', [id]);
//     if (rows.length === 0) {
//       throw new Error('User not found');
//     }

//     // Đảo ngược giá trị của isActive
//     const newIsActive = rows[0].isActive === 1 ? 0 : 1;

//     // Cập nhật giá trị của isActive
//     const result = await connection.execute(
//       'UPDATE users SET isActive = ? WHERE id = ?',
//       [newIsActive, id]
//     );

//     return result;
//   } catch (error) {
//     console.log('Error:', error);
//     throw error;
//   }
// };

export {
  //user and admin

  register,
  findUserByIdentifier,
  findById,
  updateRefreshToken,
  login,
  updateUser,
  updatePassword,
  uploadAvatar,
  updateOTP,
  resetPassword,
  checkUsernameExists,
  checkEmailExists,
  //only admin

  getListUser,
  activeUser,
  InserUser,
}


