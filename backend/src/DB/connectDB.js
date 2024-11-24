import mysql from 'mysql2'

  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'baocaonodejs',
    password: ''
  });
  const connection = pool.promise();
  const checkConnection = async () => {
    try {
      await connection.query('SELECT 1');
      console.log('connected to database');
    } catch (error) {
      console.error('you have not opened xampp:', error);
    }
  };
  checkConnection();




export default connection