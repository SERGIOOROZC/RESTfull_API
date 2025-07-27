// db.js
import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'biblioteca'
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error de conexión a MySQL:', err.message);
  } else {
    console.log('✅ Conexión a MySQL exitosa');
    connection.release();
  }
});

const db = pool.promise(); // <-- esto permite usar Promesas y async/await

export default db;
