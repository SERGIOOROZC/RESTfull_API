import express from 'express';
import {
  getResenias,
  getReseniaPorId,
  getReseniasPorLibro,
  crearResenia,
  actualizarResenia,
  eliminarResenia
} from '../controllers/resenia.controller.js';

const router = express.Router();

router.get('/', getResenias);                         // GET /resenias
router.get('/:id', getReseniaPorId);                  // GET /resenias/:id
router.get('/libro/:id_libro', getReseniasPorLibro);  // GET /resenias/libro/:id_libro
router.post('/', crearResenia);                       // POST /resenias
router.put('/:id', actualizarResenia);                // PUT /resenias/:id
router.delete('/:id', eliminarResenia);               // DELETE /resenias/:id

export default router;
