//import db from '../db.js';
import db from '../config/db.js';


// GET /prestamos
export const getPrestamos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM prestamo');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener préstamos' });
  }
};

// GET /prestamos/:id
export const getPrestamoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM prestamo WHERE id_prestamo = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Préstamo no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el préstamo' });
  }
};

// POST /prestamos
export const crearPrestamo = async (req, res) => {
  const { id_usuario, id_libro, fecha_prestamo, fecha_devolucion } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO prestamo (id_usuario, id_libro, fecha_prestamo, fecha_devolucion) VALUES (?, ?, ?, ?)',
      [id_usuario, id_libro, fecha_prestamo, fecha_devolucion]
    );
    res.status(201).json({ id_prestamo: result.insertId, id_usuario, id_libro, fecha_prestamo, fecha_devolucion });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el préstamo' });
  }
};

// PUT /prestamos/:id
export const actualizarPrestamo = async (req, res) => {
  const { id } = req.params;
  const { id_usuario, id_libro, fecha_prestamo, fecha_devolucion } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE prestamo SET id_usuario = ?, id_libro = ?, fecha_prestamo = ?, fecha_devolucion = ? WHERE id_prestamo = ?',
      [id_usuario, id_libro, fecha_prestamo, fecha_devolucion, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Préstamo no encontrado' });
    res.json({ mensaje: 'Préstamo actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el préstamo' });
  }
};

// DELETE /prestamos/:id
export const eliminarPrestamo = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM prestamo WHERE id_prestamo = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Préstamo no encontrado' });
    res.json({ mensaje: 'Préstamo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el préstamo' });
  }
};

// GET /prestamos/usuario/:id_usuario
export const getPrestamosPorUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM prestamo WHERE id_usuario = ?', [id_usuario]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener préstamos por usuario' });
  }
};

// GET /prestamos/libro/:id_libro
export const getPrestamosPorLibro = async (req, res) => {
  const { id_libro } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM prestamo WHERE id_libro = ?', [id_libro]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener préstamos por libro' });
  }
};
