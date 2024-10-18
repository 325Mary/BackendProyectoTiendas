// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {
    crearRolC,
    editarRolC,
    eliminarRolC,
    obtenerRolesC
     } = require('../controller/RolController');
const  validarTokenMiddleware= require('../middleware/userAuthentication')

router.post('/crearRol',   crearRolC); 
router.get('listRol',   obtenerRolesC);
router.put('/editRol/:idRol',  editarRolC);
router.delete('/EliminarRol/:idRol',  eliminarRolC);


module.exports = router;
