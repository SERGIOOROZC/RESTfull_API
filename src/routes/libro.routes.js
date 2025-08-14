import express from 'express';

//importo las funciones del controlador
import {
  getLibros,
  getLibroPorId,
  crearLibro,
  actualizarLibro,
  actualizarExistencia,
  eliminarLibro,
  getLibrosDisponibles,  // tercer endpoint logico
  
} from '../controllers/libro.controller.js';

// express es el modulo central 
// express.Router() es un metodo dentro de express que devuelve una nueva instancia de router para definir rutas
const router = express.Router();

//el router detecta el endpoint ,mira que tipo de peticion llego, 
//y a que URL exacta,  entonces llama a la funcion correcta ejemplo getLibro 
//que esta importada desde  controlador para manejar esa accion

router.get('/disponibles', getLibrosDisponibles);    // Express procesa las rutas en orden
router.get('/', getLibros);                          // GET /libros
router.get('/:id', getLibroPorId);                   // GET /libros/:id
router.post('/', crearLibro);                        // POST /libros
router.put('/:id', actualizarLibro);                 // PUT /libros/:id
router.put('/:id/existencia', actualizarExistencia); // PUT /libros/:id/existencia
router.delete('/:id', eliminarLibro);                // DELETE /libros/:id

//exporto el router para importalo a app.js
export default router;

