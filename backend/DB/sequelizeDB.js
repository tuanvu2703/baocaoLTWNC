import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('baocaonodejs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false, // Disable logging; default: console.log
});

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Kết nối dữ liệu thành công.');
    })
    .catch(err => {
        console.error('Kết nối dữ liệu thất bại:', err);
    });

export default sequelize;