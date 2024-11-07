const express = require('express');
const router = express.Router();
const {
    crearTiendaC,
    editarTiendaC,
    eliminarTiendaC,
    obtenerTiendasC
} = require('../controller/TiendaController');
const validarTokenMiddleware = require('../middleware/userAuthentication');

// Aplicar middleware de autenticación solo donde sea necesario
router.post('/crearTienda', validarTokenMiddleware, crearTiendaC);
router.get('/listTiendas', validarTokenMiddleware, obtenerTiendasC);
router.put('/editTienda/:id', validarTokenMiddleware, editarTiendaC);
router.delete('/eliminarTienda/:id', validarTokenMiddleware, eliminarTiendaC);

module.exports = router;
