import db from '../config/db.js';

// GET /libros
export const getLibros = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM libro');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener libros' });
  }
};

// GET /libros/:id
export const getLibroPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM libro WHERE id_libro = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el libro' });
  }
};

// POST /libros
export const crearLibro = async (req, res) => {
  const { titulo, autor, editorial, anio, existencia } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO libro (titulo, autor, editorial, anio, existencia) VALUES (?, ?, ?, ?, ?)',
      [titulo, autor, editorial, anio, existencia]
    );
    res.status(201).json({ id_libro: result.insertId, titulo, autor, editorial, anio, existencia });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el libro' });
  }
};

// PUT /libros/:id
export const actualizarLibro = async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, editorial, anio, existencia } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE libro SET titulo = ?, autor = ?, editorial = ?, anio = ?, existencia = ? WHERE id_libro = ?',
      [titulo, autor, editorial, anio, existencia, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json({ mensaje: 'Libro actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el libro' });
  }
};

// PUT /libros/:id/existencia
export const actualizarExistencia = async (req, res) => {
  const { id } = req.params;
  const { existencia } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE libro SET existencia = ? WHERE id_libro = ?',
      [existencia, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json({ mensaje: 'Existencia actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar existencia' });
  }
};

// DELETE /libros/:id
export const eliminarLibro = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM libro WHERE id_libro = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json({ mensaje: 'Libro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
};

// GET /libros/disponibles  tercer endpoint del ejercicio
export const getLibrosDisponibles = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM libro WHERE existencia > 0');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener libros disponibles' });
  }
};
