
import connection from "../DB/connectDB";
import bcrypt from "bcrypt";
import moment from "moment";
//(id, username, password, fullname, gender, born, email, address, phone, avatar, role)


const register = async(username, password, fullname, gender, born, email, address) => {
    try {
        const [userExit] = await connection.execute(
            'SELECT * FROM `users` WHERE username = ?',[username])
        const hashPassword = await bcrypt.hash(password,10)
        const formattedBorn = moment(born, 'DD-MM-YYYY').format('YYYY-MM-DD');
        const [result] = await connection.execute(
            'INSERT INTO users (username, password, fullname, gender, born, email, address) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [username, hashPassword, fullname, gender, formattedBorn , email, address] 
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
      console.log('i do not know what error',error);
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
  
      // Chuyển đổi định dạng ngày từ dd-mm-yyyy sang yyyy-mm-dd để lưu trữ
      const formattedBorn = moment(born, 'DD-MM-YYYY').format('YYYY-MM-DD');
  
      const [result] = await connection.execute(
        'UPDATE users SET fullname = ?, gender = ?, born = ?, email = ?, address = ?, phone = ? WHERE id = ?',
        [fullname, gender, formattedBorn, email, address, phone, id]
      );
  
      return result;
    } catch (error) {
      console.log('Lỗi gì đó không biết: ', error);
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

  const getListUser = async() => {
    try {
      const [rows] =  await connection.execute(
        'SELECT * FROM users'
      )
      return rows;
    } catch (error) {
      console.log('this bug userModel check its:',error);
    }
  }

  const activeUser = async(id)=>{
    try{

      const user = await findById(id);
      if(!user){
        throw new Error('User not found');
      }
      const newIsActive = user.isActive === 1 ? 0 : 1;
      await connection.execute(
        'UPDATE users SET isActive = ? WHERE id = ?',
        [newIsActive, id]
      );
    }catch (error){
      console.log('Error:', error);
    }
  }

export {
  //user and admin
    register,
    findUserByIdentifier,
    findById,
    updateRefreshToken,
    login,
    updateUser,
    updatePassword,
  //only admin
    getListUser,
    activeUser,
    
}


