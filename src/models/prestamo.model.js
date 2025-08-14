import db from '../config/db.js';

export const obtenerPrestamos = async () => {
  const [rows] = await db.query('SELECT * FROM prestamo');
  return rows;
};

export const obtenerPrestamoPorId = async (id) => {
  const [rows] = await db.query('SELECT * FROM prestamo WHERE id_prestamo = ?', [id]);
  return rows;
};

export const insertarPrestamo = async ({ id_usuario, id_libro, fecha_prestamo, fecha_devolucion }) => {
  const [result] = await db.query(
    'INSERT INTO prestamo (id_usuario, id_libro, fecha_prestamo, fecha_devolucion) VALUES (?, ?, ?, ?)',
    [id_usuario, id_libro, fecha_prestamo, fecha_devolucion]
  );
  return result.insertId;
};

export const modificarPrestamo = async (id, { id_usuario, id_libro, fecha_prestamo, fecha_devolucion }) => {
  const [result] = await db.query(
    'UPDATE prestamo SET id_usuario = ?, id_libro = ?, fecha_prestamo = ?, fecha_devolucion = ? WHERE id_prestamo = ?',
    [id_usuario, id_libro, fecha_prestamo, fecha_devolucion, id]
  );
  return result.affectedRows;
};

export const borrarPrestamo = async (id) => {
  const [result] = await db.query('DELETE FROM prestamo WHERE id_prestamo = ?', [id]);
  return result.affectedRows;
};

export const obtenerPrestamosPorUsuario = async (id_usuario) => {
  const [rows] = await db.query('SELECT * FROM prestamo WHERE id_usuario = ?', [id_usuario]);
  return rows;
};

export const obtenerPrestamosPorLibro = async (id_libro) => {
  const [rows] = await db.query('SELECT * FROM prestamo WHERE id_libro = ?', [id_libro]);
  return rows;
};
