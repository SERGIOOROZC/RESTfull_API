// hay otra manera : import {createPool} from "mysql2"; esto trae solo la creacion de la conexion
//                   const pool= mysql.createPool


import mysql from 'mysql2'; // trae todo sql para hacer solo la conexion.

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
