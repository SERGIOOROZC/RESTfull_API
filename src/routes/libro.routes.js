import express from 'express';
import {
  getLibros,
  getLibroPorId,
  crearLibro,
  actualizarLibro,
  actualizarExistencia,
  eliminarLibro,
  getLibrosDisponibles,  // tercer endpoint logico
  
} from '../controllers/libro.controller.js';

const router = express.Router();

router.get('/', getLibros);                          // GET /libros
router.get('/:id', getLibroPorId);                   // GET /libros/:id
router.post('/', crearLibro);                        // POST /libros
router.put('/:id', actualizarLibro);                 // PUT /libros/:id
router.put('/:id/existencia', actualizarExistencia); // PUT /libros/:id/existencia
router.delete('/:id', eliminarLibro);                // DELETE /libros/:id
router.get('/disponibles', getLibrosDisponibles);


export default router;
