import db from '../config/db.js';

// GET /usuarios
export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuario');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// GET /usuarios/:id
export const getUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// POST /usuarios
export const crearUsuario = async (req, res) => {
  const { nombre, apellido, mail, contrasenia, id_rol } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO usuario (nombre, apellido, mail, contrasenia, id_rol) VALUES (?, ?, ?, ?, ?)',
      [nombre, apellido, mail, contrasenia, id_rol]
    );
    res.status(201).json({ id_usuario: result.insertId, nombre, apellido, mail, id_rol });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// PUT /usuarios/:id
export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, mail, contrasenia, id_rol } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE usuario SET nombre = ?, apellido = ?, mail = ?, contrasenia = ?, id_rol = ? WHERE id_usuario = ?',
      [nombre, apellido, mail, contrasenia, id_rol, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// DELETE /usuarios/:id
export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM usuario WHERE id_usuario = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};
