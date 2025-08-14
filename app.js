//importo modulos - app.js tiene la configuracion general
// 1 express para crear el servidor
// 2 db.js para la conexion a base de datos
// 3 archivos de rutas - usuarioRoutes,libroRoutes,etc

import express from 'express';
import db from './src/config/db.js';
import usuarioRoutes from './src/routes/usuario.routes.js';
import libroRoutes from './src/routes/libro.routes.js';
import prestamoRoutes from './src/routes/prestamo.routes.js';
import reseniaRoutes from './src/routes/resenia.routes.js';



const app = express();                // 4 Primero declarás "app" para inicializar el servidor.
const PORT = 3000;

// lo uso - tipos de datos que puedo recibir
app.use(express.json());                         // 5 Middleware para JSON permite recibir datos json en las peticiones
app.use(express.text());                         // si llega peticion en texto plano
app.use(express.urlencoded({extended:true}));    //datos en formato formulario html 

// Le dice a Express: “Si llega una petición que empieza con /usuarios, envíala al router usuarioRoutes para que ahí busque la ruta exacta.”
app.use('/usuarios', usuarioRoutes);  
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
