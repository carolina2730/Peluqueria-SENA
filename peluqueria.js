const express = require('express');
const cors = require('cors');
const rutaadmin = require('./vista/admin/RutasAdmin');
const rutacliente = require('./vista/clientes/RutasClientes');
const rutatrabajador = require('./vista/trabajadores/RutasTrabajadores');
const app = express();
const PORT = process.env.PORT || 3333;

// Mi middleware
app.use(cors({
    origin: '*', // Cambiar ['http://guillodelapena.xo.je/evidencias/', 'http://yo.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true // Habilita el envío de credenciales si es necesario
  }));

  // Middleware para parseo de solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas 
app.use('/', rutacliente);
app.use('/', rutaadmin);
app.use('/', rutatrabajador);
app.get('/', (req, res) => {
    res.send('¡hola desde mi servidor node.js!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });