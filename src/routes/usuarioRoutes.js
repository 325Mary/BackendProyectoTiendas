// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {crearUsuarioC,
     obtenerUsuariosC,
     postLogin,
     editarUsuarioC,
     eliminarUsuarioC,
     cambiarContraseñaC,
     solicitarRestablecimiento,
      restablecerContraseña,
      estadoUsuarioC,
      cerrarSesionC,
      getUserId,
      enviarDatosUsuarioPorCorreoController
     } = require('../controller/usuarioController');
const checkPerfil = require('../middleware/verificadorDePerfil')
const  validarTokenMiddleware= require('../middleware/userAuthentication')


router.post('/crearUsuario',   crearUsuarioC); 
router.get('/listUsuarios',   obtenerUsuariosC);
router.post('/iniciarSesion', postLogin)
router.put('/editUser/:idUsuario',  editarUsuarioC);
router.delete('/EliminarUser/:idUsuario',  eliminarUsuarioC);
router.put('/cambiarPassword/:idUsuario', cambiarContraseñaC);
router.post('/solicitarRestablecimiento', solicitarRestablecimiento);
router.post('/restablecerPassword', restablecerContraseña);
router.put('/estadoUser/:idUsuario' ,  estadoUsuarioC);
router.post('/cerrarSesion', cerrarSesionC);
router.get('/getId/:idUsuario',  getUserId);
router.post('/enviarCorreo/:idUsuario',   enviarDatosUsuarioPorCorreoController);

module.exports = router;
