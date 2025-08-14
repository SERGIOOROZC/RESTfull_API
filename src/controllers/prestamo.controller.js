import {
  obtenerPrestamos,
  obtenerPrestamoPorId,
  insertarPrestamo,
  modificarPrestamo,
  borrarPrestamo,
  obtenerPrestamosPorUsuario,
  obtenerPrestamosPorLibro
} from '../model/prestamo.model.js';

// GET /prestamos
export const getPrestamos = async (req, res) => {
  try {
    res.json(await obtenerPrestamos());
  } catch {
    res.status(500).json({ error: 'Error al obtener préstamos' });
  }
};

// GET /prestamos/:id
export const getPrestamoPorId = async (req, res) => {
  try {
    const prestamo = await obtenerPrestamoPorId(req.params.id);
    if (prestamo.length === 0) return res.status(404).json({ error: 'Préstamo no encontrado' });
    res.json(prestamo[0]);
  } catch {
    res.status(500).json({ error: 'Error al obtener el préstamo' });
  }
};

// POST /prestamos
export const crearPrestamo = async (req, res) => {
  try {
    const id = await insertarPrestamo(req.body);
    res.status(201).json({ id_prestamo: id, ...req.body });
  } catch {
    res.status(500).json({ error: 'Error al crear el préstamo' });
  }
};

// PUT /prestamos/:id
export const actualizarPrestamo = async (req, res) => {
  try {
    const updated = await modificarPrestamo(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Préstamo no encontrado' });
    res.json({ mensaje: 'Préstamo actualizado correctamente' });
  } catch {
    res.status(500).json({ error: 'Error al actualizar el préstamo' });
  }
};

// DELETE /prestamos/:id
export const eliminarPrestamo = async (req, res) => {
  try {
    const deleted = await borrarPrestamo(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Préstamo no encontrado' });
    res.json({ mensaje: 'Préstamo eliminado correctamente' });
  } catch {
    res.status(500).json({ error: 'Error al eliminar el préstamo' });
  }
};

// GET /prestamos/usuario/:id_usuario
export const getPrestamosPorUsuario = async (req, res) => {
  try {
    res.json(await obtenerPrestamosPorUsuario(req.params.id_usuario));
  } catch {
    res.status(500).json({ error: 'Error al obtener préstamos por usuario' });
  }
};

// GET /prestamos/libro/:id_libro
export const getPrestamosPorLibro = async (req, res) => {
  try {
    res.json(await obtenerPrestamosPorLibro(req.params.id_libro));
  } catch {
    res.status(500).json({ error: 'Error al obtener préstamos por libro' });
  }
};
