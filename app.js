// app.js

/*/import express from 'express';
import db from './db.js';
import usuarioRoutes from './routes/usuario.routes.js';
import libroRoutes from './routes/libro.routes.js';
import prestamoRoutes from './routes/prestamo.routes.js';
import reseniaRoutes from './routes/resenia.routes.js';
*/

//codigo actualizado importacion 
// lo traigo/importo

import express from 'express';
import db from './src/config/db.js';
import usuarioRoutes from './src/routes/usuario.routes.js';
import libroRoutes from './src/routes/libro.routes.js';
import prestamoRoutes from './src/routes/prestamo.routes.js';
import reseniaRoutes from './src/routes/resenia.routes.js';



const app = express();                // Primero declarás "app"
const PORT = 3000;

// lo uso
app.use(express.json());              // Middleware para JSON

app.use('/usuarios', usuarioRoutes);  // rutas
app.use('/libros', libroRoutes);
app.use('/prestamos', prestamoRoutes);
app.use('/resenias', reseniaRoutes);




// Ruta para verificar conexión
app.get('/ping-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS resultado');
    res.json({ mensaje: 'Conexión OK', resultado: rows[0].resultado });
  } catch (error) {
    console.error('Error al consultar:', error);
    res.status(500).json({ error: 'Error en la consulta' });
  }
});

// Este GET ya no es necesario si usás usuario.routes.js
// app.get('/usuarios', ...) → se reemplaza por el router

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
