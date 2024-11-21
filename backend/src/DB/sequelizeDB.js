import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('baocaonodejs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false, 
});

const authenticateDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Kết nối dữ liệu thành công.');
  } catch (err) {
    console.error('Kết nối dữ liệu thất bại:', err);
  }
};

authenticateDB();

export default sequelize;