import express from 'express';
import {
  getPrestamos,
  getPrestamoPorId,
  crearPrestamo,
  actualizarPrestamo,
  eliminarPrestamo,
  getPrestamosPorUsuario,
  getPrestamosPorLibro
} from '../controllers/prestamo.controller.js';

const router = express.Router();

router.get('/', getPrestamos);                          // GET /prestamos
router.get('/:id', getPrestamoPorId);                   // GET /prestamos/:id
router.post('/', crearPrestamo);                        // POST /prestamos
router.put('/:id', actualizarPrestamo);                 // PUT /prestamos/:id
router.delete('/:id', eliminarPrestamo);                // DELETE /prestamos/:id

// Rutas adicionales (lógicas)
router.get('/usuario/:id_usuario', getPrestamosPorUsuario);  // GET /prestamos/usuario/:id_usuario
router.get('/libro/:id_libro', getPrestamosPorLibro);        // GET /prestamos/libro/:id_libro

export default router;
