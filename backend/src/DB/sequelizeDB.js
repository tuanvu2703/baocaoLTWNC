import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('baocaonodejs', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false,
  dialectOptions: {
    timezone: 'Z', // Đặt múi giờ UTC (hợp lệ)
  },
  timezone: '+00:00', // Thiết lập múi giờ cho các câu lệnh SQL
});

const authenticateDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
};

const syncDB = async () => {
  try {
    await sequelize.sync({ force: false }); // Đồng bộ hóa mà không làm mất dữ liệu
    console.log('Database synced successfully.');
  } catch (err) {
    console.error('Database sync failed:', err);
  }
};

syncDB();
authenticateDB();

export default sequelize;
