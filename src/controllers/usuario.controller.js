import {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  insertarUsuario,
  modificarUsuario,
  borrarUsuario
} from '../model/usuario.model.js';

// GET /usuarios
export const getUsuarios = async (req, res) => {
  try {
    res.json(await obtenerUsuarios());
  } catch {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// GET /usuarios/:id
export const getUsuarioPorId = async (req, res) => {
  try {
    const usuario = await obtenerUsuarioPorId(req.params.id);
    if (usuario.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario[0]);
  } catch {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// POST /usuarios
export const crearUsuario = async (req, res) => {
  try {
    const id = await insertarUsuario(req.body);
    res.status(201).json({ id_usuario: id, ...req.body });
  } catch {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// PUT /usuarios/:id
export const actualizarUsuario = async (req, res) => {
  try {
    const updated = await modificarUsuario(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario actualizado correctamente' });
  } catch {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// DELETE /usuarios/:id
export const eliminarUsuario = async (req, res) => {
  try {
    const deleted = await borrarUsuario(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};
