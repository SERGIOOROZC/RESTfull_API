import db from '../config/db.js';

export const obtenerUsuarios = async () => {
  const [rows] = await db.query('SELECT * FROM usuario');
  return rows;
};

export const obtenerUsuarioPorId = async (id) => {
  const [rows] = await db.query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);
  return rows;
};

export const insertarUsuario = async ({ nombre, apellido, mail, contrasenia, id_rol }) => {
  const [result] = await db.query(
    'INSERT INTO usuario (nombre, apellido, mail, contrasenia, id_rol) VALUES (?, ?, ?, ?, ?)',
    [nombre, apellido, mail, contrasenia, id_rol]
  );
  return result.insertId;
};

export const modificarUsuario = async (id, { nombre, apellido, mail, contrasenia, id_rol }) => {
  const [result] = await db.query(
    'UPDATE usuario SET nombre = ?, apellido = ?, mail = ?, contrasenia = ?, id_rol = ? WHERE id_usuario = ?',
    [nombre, apellido, mail, contrasenia, id_rol, id]
  );
  return result.affectedRows;
};

export const borrarUsuario = async (id) => {
  const [result] = await db.query('DELETE FROM usuario WHERE id_usuario = ?', [id]);
  return result.affectedRows;
};
