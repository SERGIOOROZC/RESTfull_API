import {
  obtenerLibros,
  obtenerLibroPorId,
  insertarLibro,
  modificarLibro,
  modificarExistenciaLibro,
  borrarLibro,
  obtenerLibrosDisponibles
} from '../model/libro.model.js';

// GET /libros
export const getLibros = async (req, res) => {
  try {
    res.json(await obtenerLibros());
  } catch {
    res.status(500).json({ error: 'Error al obtener libros' });
  }
};

// GET /libros/:id
export const getLibroPorId = async (req, res) => {
  try {
    const libro = await obtenerLibroPorId(req.params.id);
    if (libro.length === 0) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json(libro[0]);
  } catch {
    res.status(500).json({ error: 'Error al obtener el libro' });
  }
};

// POST /libros
export const crearLibro = async (req, res) => {
  try {
    const id = await insertarLibro(req.body);
    res.status(201).json({ id_libro: id, ...req.body });
  } catch {
    res.status(500).json({ error: 'Error al crear el libro' });
  }
};

// PUT /libros/:id
export const actualizarLibro = async (req, res) => {
  try {
    const updated = await modificarLibro(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json({ mensaje: 'Libro actualizado correctamente' });
  } catch {
    res.status(500).json({ error: 'Error al actualizar el libro' });
  }
};

// PUT /libros/:id/existencia
export const actualizarExistencia = async (req, res) => {
  try {
    const updated = await modificarExistenciaLibro(req.params.id, req.body.existencia);
    if (!updated) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json({ mensaje: 'Existencia actualizada correctamente' });
  } catch {
    res.status(500).json({ error: 'Error al actualizar existencia' });
  }
};

// DELETE /libros/:id
export const eliminarLibro = async (req, res) => {
  try {
    const deleted = await borrarLibro(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json({ mensaje: 'Libro eliminado correctamente' });
  } catch {
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
};

// GET /libros/disponibles
export const getLibrosDisponibles = async (req, res) => {
  try {
    res.json(await obtenerLibrosDisponibles());
  } catch {
    res.status(500).json({ error: 'Error al obtener libros disponibles' });
  }
};
