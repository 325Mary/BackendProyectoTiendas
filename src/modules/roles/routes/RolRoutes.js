const express = require('express');
const router = express.Router();
const {
    crearRolC,
    editarRolC,
    eliminarRolC,
    obtenerRolesC
} = require('../controller/RolController');
const validarTokenMiddleware = require('../middleware/userAuthentication');

// Aplicar middleware de autenticación solo donde sea necesario
router.post('/crearRol', validarTokenMiddleware, crearRolC); 
router.get('/listRol', validarTokenMiddleware, obtenerRolesC);
router.put('/editRol/:idRol', validarTokenMiddleware, editarRolC);
router.delete('/eliminarRol/:idRol', validarTokenMiddleware, eliminarRolC);

module.exports = router;
