import db from '../config/db.js';

export const obtenerLibros = async () => {
  const [rows] = await db.query('SELECT * FROM libro');
  return rows;
};

export const obtenerLibroPorId = async (id) => {
  const [rows] = await db.query('SELECT * FROM libro WHERE id_libro = ?', [id]);
  return rows;
};

export const insertarLibro = async ({ titulo, autor, editorial, anio, existencia }) => {
  const [result] = await db.query(
    'INSERT INTO libro (titulo, autor, editorial, anio, existencia) VALUES (?, ?, ?, ?, ?)',
    [titulo, autor, editorial, anio, existencia]
  );
  return result.insertId;
};

export const modificarLibro = async (id, { titulo, autor, editorial, anio, existencia }) => {
  const [result] = await db.query(
    'UPDATE libro SET titulo = ?, autor = ?, editorial = ?, anio = ?, existencia = ? WHERE id_libro = ?',
    [titulo, autor, editorial, anio, existencia, id]
  );
  return result.affectedRows;
};

export const modificarExistenciaLibro = async (id, existencia) => {
  const [result] = await db.query(
    'UPDATE libro SET existencia = ? WHERE id_libro = ?',
    [existencia, id]
  );
  return result.affectedRows;
};

export const borrarLibro = async (id) => {
  const [result] = await db.query('DELETE FROM libro WHERE id_libro = ?', [id]);
  return result.affectedRows;
};

export const obtenerLibrosDisponibles = async () => {
  const [rows] = await db.query('SELECT * FROM libro WHERE existencia > 0');
  return rows;
};
