import {
  obtenerResenas,
  obtenerResenaPorId,
  insertarResena,
  modificarResena,
  borrarResena
} from '../model/resena.model.js';

// GET /resenas
export const getResenas = async (req, res) => {
  try {
    res.json(await obtenerResenas());
  } catch {
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
};

// GET /resenas/:id
export const getResenaPorId = async (req, res) => {
  try {
    const resena = await obtenerResenaPorId(req.params.id);
    if (resena.length === 0) return res.status(404).json({ error: 'Reseña no encontrada' });
    res.json(resena[0]);
  } catch {
    res.status(500).json({ error: 'Error al obtener la reseña' });
  }
};

// POST /resenas
export const crearResena = async (req, res) => {
  try {
    const id = await insertarResena(req.body);
    res.status(201).json({ id_resena: id, ...req.body });
  } catch {
    res.status(500).json({ error: 'Error al crear la reseña' });
  }
};

// PUT /resenas/:id
export const actualizarResena = async (req, res) => {
  try {
    const updated = await modificarResena(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Reseña no encontrada' });
    res.json({ mensaje: 'Reseña actualizada correctamente' });
  } catch {
    res.status(500).json({ error: 'Error al actualizar la reseña' });
  }
};

// DELETE /resenas/:id
export const eliminarResena = async (req, res) => {
  try {
    const deleted = await borrarResena(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Reseña no encontrada' });
    res.json({ mensaje: 'Reseña eliminada correctamente' });
  } catch {
    res.status(500).json({ error: 'Error al eliminar la reseña' });
  }
};
