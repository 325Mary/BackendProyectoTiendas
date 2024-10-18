const { crearUsuario,
  obtenerUsuarios, 
  loginUser,
  editarUsuario,
  eliminarUsuario,
  cambiarContraseña,
  generarCodigoRestablecimiento,
  enviarCorreoRestablecimiento,
  restablecerContraseña,
  estadoDeUsuario,
  cerrarSesion,
  getUserById,
  enviarDatosUsuarioPorCorreo } = require('../services/usuarioService');
const validarCamposRequeridos = require('../middleware/camposrequeridosUser');
const {findOneByEmail} = require('../models/usuarioModel')
const pool = require('../config/database');
const { ResponseStructure } = require('../helpers/ResponseStructure'); 
const controller = {};

controller.crearUsuarioC = async (req, res, next) => {
  try {
    validarCamposRequeridos(['idRol',  'identificacion', 'nombre_usuario', 'apellido_usuario', 'telefono_usuario', 'email_usuario', 'estado'])(req, res, async () => {
      const usuarioData = req.body;

      const existingUser = await findOneByEmail(usuarioData.email_usuario);
      if (existingUser) {
        return res.status(400).json({ ...ResponseStructure, status: 400, message: 'El correo electrónico ya está registrado' });
      }

      const usuario = await crearUsuario(usuarioData);
      res.status(201).json({ ...ResponseStructure, message: 'Usuario creado exitosamente', data: usuario });
    });
  } catch (error) {
    res.status(500).json({ ...ResponseStructure, status: 500, error: error.message });
  }
};


controller.obtenerUsuariosC = async (req, res, next) => {
 try {
   const usuarios = await obtenerUsuarios();
   res.status(200).json({ ...ResponseStructure, message: 'Usuarios listados correctamente', data: usuarios });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, message: 'No se obtuvieron los usuarios', error });
  }
};

controller.postLogin = async (req, res) => {
  try {
    
    await loginUser(req, res);
  } catch (error) {
    res.status(500).json({ ...ResponseStructure, status: 500, error: error.message });
  }
};




controller.editarUsuarioC = async (req, res, next) => {
  try {
    const idUsuario = req.params.idUsuario;
    const nuevoUsuarioData = req.body;

    if (Object.keys(nuevoUsuarioData).length === 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, message: 'El cuerpo de la solicitud está vacío' });
    }

    const camposValidos = ['idUsuario', 'idRol', 'identificacion', 'nombre_usuario', 'apellido_usuario', 'telefono_usuario', 'email_usuario', 'password', 'estado'];

    const camposRecibidos = Object.keys(nuevoUsuarioData);
    const camposInvalidos = camposRecibidos.filter(field => !camposValidos.includes(field));

    if (camposInvalidos.length > 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, message: 'El cuerpo de la solicitud contiene campos no válidos', invalidFields: camposInvalidos });
    }

    const usuarioActualizado = await editarUsuario(idUsuario, nuevoUsuarioData);
    res.status(200).json({ ...ResponseStructure, message: 'Usuario actualizado exitosamente', data: usuarioActualizado });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, message: 'No se actualizó ningún usuario con el ID proporcionado', error });
  }
};



controller.eliminarUsuarioC = async (req, res, next) => {
 try {
   const idUsuario = req.params.idUsuario; 
   await eliminarUsuario(idUsuario);
   res.status(200).json({ ...ResponseStructure, message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, message: 'No se encontró ningún usuario con el ID proporcionado', error });
  }
};

controller.cambiarContraseñaC = async (req, res) => {
 try {
   const idUsuario = req.params.idUsuario; 
   const { newPassword } = req.body;

   if (!newPassword) {
    return res.status(400).json({ ...ResponseStructure, status: 400, message: 'El campo newPassword está vacío' });
  }


   await cambiarContraseña(idUsuario, newPassword);

   res.status(200).json({ ...ResponseStructure, message: 'Contraseña cambiada exitosamente' });
  } catch (error) {
    res.status(500).json({ ...ResponseStructure, status: 500, error: error.message });
  }
};



controller.solicitarRestablecimiento = async (req, res) => {
 try {
   const { email_usuario } = req.body;

   const usuario = await findOneByEmail(email_usuario);

   if (!usuario) {
    return res.status(404).json({ ...ResponseStructure, status: 404, message: 'Usuario no encontrado' });
    }

   const codigoRestablecimiento = generarCodigoRestablecimiento();
   
   usuario.resetCode = codigoRestablecimiento;
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

   res.json({ ...ResponseStructure, message: 'Solicitud de restablecimiento enviada con éxito' });
  } catch (error) {
    console.error('Error al solicitar restablecimiento:', error);
    res.status(500).json({ ...ResponseStructure, status: 500, error: 'Error interno del servidor' });
  }
};


controller.restablecerContraseña = async (req, res) => {
 try {
   const { email_usuario, codigo, nuevaContrasena } = req.body;

   console.log(`Solicitud de restablecimiento de contraseña para ${email_usuario} con código ${codigo}`);

   const resultado = await restablecerContraseña(email_usuario, codigo, nuevaContrasena);
   res.json({ ...ResponseStructure, message: 'Accion Exitosa',  data: resultado });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ ...ResponseStructure, status: 500, error: 'Error interno del servidor' });
  }
};


controller.estadoUsuarioC = async (req, res, next) => {
 try {
   const idUsuario = req.params.idUsuario; 
   const nuevoUsuarioData = req.body; 
   if ( !nuevoUsuarioData || Object.keys(nuevoUsuarioData).length === 0) {
    return res.status(400).json({ ...ResponseStructure, status: 400, error: 'Los datos del usuario están incompletos' });
  }

   const usuarioActualizado = await estadoDeUsuario(idUsuario, nuevoUsuarioData);

   res.status(200).json({ ...ResponseStructure, message: 'Usuario actualizado exitosamente', data: usuarioActualizado });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se actualizó ningún usuario con el ID proporcionado' });
  }
};


controller.cerrarSesionC = async (req, res, next) => {
 try {
   const authorizationHeader = req.headers.authorization;
   if (!authorizationHeader) {
    return res.status(401).json({ ...ResponseStructure, status: 401, error: 'No se proporcionó un token de autenticación' });
  }

   const token = req.headers['authorization']; 
   await cerrarSesion(token);

   res.status(200).json({ ...ResponseStructure, message: 'Sesión cerrada exitosamente' });
  } catch (error) {
    next(error);
  }
};
controller.getUserId= async (req, res) => {
  try {
    const idUsuario = req.params.idUsuario; 
    const user = await getUserById(idUsuario);
    res.json({ user }); 
  } catch (error) {
    console.error('Error al obtener el usuario por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

controller.enviarDatosUsuarioPorCorreoController = async (req, res) => {
  try {
    const idUsuario = req.params.idUsuario;
    await enviarDatosUsuarioPorCorreo(idUsuario);
    res.status(200).json({ message: 'Datos de usuario enviados por correo exitosamente' });
  } catch (error) {
    console.error('Error al enviar datos de usuario por correo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


module.exports = controller;
