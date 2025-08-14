import db from '../config/db.js';

export const obtenerResenas = async () => {
  const [rows] = await db.query('SELECT * FROM resena');
  return rows;
};

export const obtenerResenaPorId = async (id) => {
  const [rows] = await db.query('SELECT * FROM resena WHERE id_resena = ?', [id]);
  return rows;
};

export const insertarResena = async ({ id_usuario, id_libro, comentario, puntuacion }) => {
  const [result] = await db.query(
    'INSERT INTO resena (id_usuario, id_libro, comentario, puntuacion) VALUES (?, ?, ?, ?)',
    [id_usuario, id_libro, comentario, puntuacion]
  );
  return result.insertId;
};

export const modificarResena = async (id, { id_usuario, id_libro, comentario, puntuacion }) => {
  const [result] = await db.query(
    'UPDATE resena SET id_usuario = ?, id_libro = ?, comentario = ?, puntuacion = ? WHERE id_resena = ?',
    [id_usuario, id_libro, comentario, puntuacion, id]
  );
  return result.affectedRows;
};

export const borrarResena = async (id) => {
  const [result] = await db.query('DELETE FROM resena WHERE id_resena = ?', [id]);
  return result.affectedRows;
};
