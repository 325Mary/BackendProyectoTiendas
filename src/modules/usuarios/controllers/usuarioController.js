const { crearUsuario, obtenerUsuarios, loginUser, editarUsuario, eliminarUsuario, cambiarContraseña, generarCodigoRestablecimiento, enviarCorreoRestablecimiento, restablecerContraseña, estadoDeUsuario, cerrarSesion, getUserById, enviarDatosUsuarioPorCorreo } = require('../services/usuarioService');
const validarCamposRequeridos = require('../middleware/camposrequeridosUser');
const { findOneByEmail } = require('../models/usuarioModel');
const pool = require('../config/database');
const ResponseStructure = require('../helpers/ResponseStructure');
const controller = {};

controller.crearUsuarioC = async (req, res, next) => {
  try {
    validarCamposRequeridos(['idRol', 'idTienda', 'identificacion', 'nombre_usuario', 'apellido_usuario', 'telefono_usuario', 'email_usuario', 'estado'])(req, res, async () => {
      const usuarioData = req.body;

      const existingUser = await findOneByEmail(usuarioData.email_usuario);
      if (existingUser) {
        return res.status(400).json(ResponseStructure.error('El correo electrónico ya está registrado', 400));
      }

      const usuario = await crearUsuario(usuarioData);
      res.status(201).json(ResponseStructure.success(usuario, 'Usuario creado exitosamente'));
    });
  } catch (error) {
    res.status(500).json(ResponseStructure.error(error.message, 500));
  }
};

controller.obtenerUsuariosC = async (req, res, next) => {
  try {
    const usuarios = await obtenerUsuarios();
    res.status(200).json(ResponseStructure.success(usuarios, 'Usuarios listados correctamente'));
  } catch (error) {
    res.status(404).json(ResponseStructure.error('No se obtuvieron los usuarios', 404));
  }
};

controller.postLogin = async (req, res) => {
  try {
    await loginUser(req, res);
  } catch (error) {
    res.status(500).json(ResponseStructure.error(error.message, 500));
  }
};

controller.editarUsuarioC = async (req, res, next) => {
  try {
    const idUsuario = req.params.idUsuario;
    const nuevoUsuarioData = req.body;

    if (Object.keys(nuevoUsuarioData).length === 0) {
      return res.status(400).json(ResponseStructure.error('El cuerpo de la solicitud está vacío', 400));
    }

    const camposValidos = ['idUsuario', 'idRol', 'idTienda', 'identificacion', 'nombre_usuario', 'apellido_usuario', 'telefono_usuario', 'email_usuario', 'password', 'estado'];
    const camposRecibidos = Object.keys(nuevoUsuarioData);
    const camposInvalidos = camposRecibidos.filter(field => !camposValidos.includes(field));

    if (camposInvalidos.length > 0) {
      return res.status(400).json(ResponseStructure.error('El cuerpo de la solicitud contiene campos no válidos', 400));
    }

    const usuarioActualizado = await editarUsuario(idUsuario, nuevoUsuarioData);
    res.status(200).json(ResponseStructure.success(usuarioActualizado, 'Usuario actualizado exitosamente'));
  } catch (error) {
    res.status(404).json(ResponseStructure.error('No se actualizó ningún usuario con el ID proporcionado', 404));
  }
};

controller.eliminarUsuarioC = async (req, res, next) => {
  try {
    const idUsuario = req.params.idUsuario;
    await eliminarUsuario(idUsuario);
    res.status(200).json(ResponseStructure.success({}, 'Usuario eliminado exitosamente'));
  } catch (error) {
    res.status(404).json(ResponseStructure.error('No se encontró ningún usuario con el ID proporcionado', 404));
  }
};

controller.cambiarContraseñaC = async (req, res) => {
  try {
    const idUsuario = req.params.idUsuario;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json(ResponseStructure.error('El campo newPassword está vacío', 400));
    }

    await cambiarContraseña(idUsuario, newPassword);
    res.status(200).json(ResponseStructure.success({}, 'Contraseña cambiada exitosamente'));
  } catch (error) {
    res.status(500).json(ResponseStructure.error(error.message, 500));
  }
};

controller.solicitarRestablecimiento = async (req, res) => {
  try {
    const { email_usuario } = req.body;
    const usuario = await findOneByEmail(email_usuario);

    if (!usuario) {
      return res.status(404).json(ResponseStructure.error('Usuario no encontrado', 404));
    }

    const codigoRestablecimiento = generarCodigoRestablecimiento();
    const expirationDate = new Date(Date.now() + 3600000);
    const formattedExpirationDate = expirationDate.toISOString().slice(0, 19).replace('T', ' ');

    const [result] = await pool.execute(
      'UPDATE usuario SET resetCode = ?, resetExpires = ? WHERE idUsuario = ?',
      [codigoRestablecimiento, formattedExpirationDate, usuario.idUsuario]
    );

    if (result.affectedRows === 0) {
      throw new Error('No se pudo actualizar el usuario');
    }

    await enviarCorreoRestablecimiento(email_usuario, codigoRestablecimiento);
    res.json(ResponseStructure.success({}, 'Solicitud de restablecimiento enviada con éxito'));
  } catch (error) {
    console.error('Error al solicitar restablecimiento:', error);
    res.status(500).json(ResponseStructure.error('Error interno del servidor', 500));
  }
};

controller.restablecerContraseña = async (req, res) => {
  try {
    const { email_usuario, codigo, nuevaContrasena } = req.body;
    console.log(`Solicitud de restablecimiento de contraseña para ${email_usuario} con código ${codigo}`);

    const resultado = await restablecerContraseña(email_usuario, codigo, nuevaContrasena);
    res.json(ResponseStructure.success(resultado, 'Contraseña restablecida con éxito'));
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json(ResponseStructure.error('Error interno del servidor', 500));
  }
};

controller.estadoUsuarioC = async (req, res, next) => {
  try {
    const idUsuario = req.params.idUsuario;
    const nuevoUsuarioData = req.body;

    if (!nuevoUsuarioData || Object.keys(nuevoUsuarioData).length === 0) {
      return res.status(400).json(ResponseStructure.error('Los datos del usuario están incompletos', 400));
    }

    const usuarioActualizado = await estadoDeUsuario(idUsuario, nuevoUsuarioData);
    res.status(200).json(ResponseStructure.success(usuarioActualizado, 'Usuario actualizado exitosamente'));
  } catch (error) {
    res.status(404).json(ResponseStructure.error('No se actualizó ningún usuario con el ID proporcionado', 404));
  }
};

controller.cerrarSesionC = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json(ResponseStructure.error('No se proporcionó un token de autenticación', 401));
    }

    const token = req.headers['authorization'];
    await cerrarSesion(token);

    res.status(200).json(ResponseStructure.success({}, 'Sesión cerrada exitosamente'));
  } catch (error) {
    next(error);
  }
};

controller.getUserId = async (req, res) => {
  try {
    const idUsuario = req.params.idUsuario;
    const user = await getUserById(idUsuario);
    res.json(ResponseStructure.success(user, 'Usuario obtenido con éxito'));
  } catch (error) {
    console.error('Error al obtener el usuario por ID:', error);
    res.status(500).json(ResponseStructure.error('Error interno del servidor', 500));
  }
};

controller.enviarDatosUsuarioPorCorreoController = async (req, res) => {
  try {
    const idUsuario = req.params.idUsuario;
    await enviarDatosUsuarioPorCorreo(idUsuario);
    res.status(200).json(ResponseStructure.success({}, 'Datos de usuario enviados por correo exitosamente'));
  } catch (error) {
    console.error('Error al enviar datos de usuario por correo:', error);
    res.status(500).json(ResponseStructure.error('Error interno del servidor', 500));
  }
};

module.exports = controller;
