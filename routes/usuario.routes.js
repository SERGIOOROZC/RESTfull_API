import express from 'express';
import {
  getUsuarios,
  getUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from '../controllers/usuario.controller.js';

const router = express.Router();

router.get('/', getUsuarios);                 // GET /usuarios
router.get('/:id', getUsuarioPorId);          // GET /usuarios/:id
router.post('/', crearUsuario);               // POST /usuarios
router.put('/:id', actualizarUsuario);        // PUT /usuarios/:id
router.delete('/:id', eliminarUsuario);       // DELETE /usuarios/:id

export default router;
