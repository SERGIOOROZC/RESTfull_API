import db from '../db.js';

// GET /resenias
export const getResenias = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM resenia');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
};

// GET /resenias/:id
export const getReseniaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM resenia WHERE id_resenia = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Reseña no encontrada' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la reseña' });
  }
};

// GET /resenias/libro/:id_libro
export const getReseniasPorLibro = async (req, res) => {
  const { id_libro } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM resenia WHERE id_libro = ?', [id_libro]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reseñas del libro' });
  }
};

// POST /resenias
export const crearResenia = async (req, res) => {
  const { id_usuario, id_libro, comentario, puntaje } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO resenia (id_usuario, id_libro, comentario, puntaje) VALUES (?, ?, ?, ?)',
      [id_usuario, id_libro, comentario, puntaje]
    );
    res.status(201).json({
      id_resenia: result.insertId,
      id_usuario,
      id_libro,
      comentario,
      puntaje
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la reseña' });
  }
};

// PUT /resenias/:id
export const actualizarResenia = async (req, res) => {
  const { id } = req.params;
  const { comentario, puntaje } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE resenia SET comentario = ?, puntaje = ? WHERE id_resenia = ?',
      [comentario, puntaje, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Reseña no encontrada' });
    res.json({ mensaje: 'Reseña actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la reseña' });
  }
};

// DELETE /resenias/:id
export const eliminarResenia = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM resenia WHERE id_resenia = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Reseña no encontrada' });
    res.json({ mensaje: 'Reseña eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la reseña' });
  }
};
