const {Usuario,
   findOneByEmail,
   findByPk,
   deleteById} = require('../models/usuarioModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const nodemailer = require('nodemailer');
const {listaNegraService} = require('./listaNegraService')


require('dotenv').config();


async function crearUsuario(usuarioData) {
  try {
      if (!usuarioData || !usuarioData.idRol  || !usuarioData.identificacion || !usuarioData.nombre_usuario || !usuarioData.apellido_usuario || !usuarioData.telefono_usuario || !usuarioData.email_usuario || !usuarioData.estado ) {
          throw new Error('Faltan datos del usuario');
      }


      const defaultPassword = usuarioData.identificacion;
      if (!defaultPassword) {
          throw new Error('Identificación no proporcionada');
      }

      const hashedPassword = await bcrypt.hash(defaultPassword, 12);
      usuarioData.password = hashedPassword;
      usuarioData.firstLogin = 1;

      const nuevoUsuario = await Usuario.create(usuarioData);
      return nuevoUsuario;
  } catch (error) {
      throw error;
  }
}
const obtenerUsuarios = async () => {
  try {
    const usuarios = await Usuario.findAll();
    return usuarios;
  } catch (error) {
    throw error;
  }
};


async function loginUser(req, res) {
  try {
    const { email_usuario, password } = req.body;

    if (!email_usuario || !password) {
      return res.status(400).json({ error: 'El correo electrónico y la contraseña son requeridos' });
    }

    const user = await findOneByEmail(email_usuario);

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
 if (user.estado !== "Y") {
  return res.status(401).json({ error: 'No puede iniciar sesión, su usuario está inactivo' });
}
if (user.firstLogin) {
  return res.status(200).json({ message: 'Por favor, cambie su contraseña.', firstLogin: 1, token: crearToken(user), userId: user.idUsuario });
}

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.json({ success: 'Inicio de sesión correcto', token: crearToken(user), userId: user.idUsuario });
    } else {
      return res.status(401).json({ error: 'Credenciales inválidas ' });
    }

  } catch (e) {
    console.error('Error:', e);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

function crearToken(user) {
  const { idUsuario, email_usuario,  nombre_usuario, identificacion, idRol } = user;
  const payload = { userId: idUsuario, email_usuario , nombre_usuario, identificacion, idRol };
  console.log("Atributos del payload:", payload); 
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: '30m' };
  const token = jwt.sign(payload, secret, options);
  return token;
}

async function editarUsuario(idUsuario, nuevoUsuarioData) {
  try {
    const usuarioExistente = await findByPk(idUsuario);
    if (!usuarioExistente) {
      throw new Error('El usuario no existe');
    }

    const usuarioActualizado = { ...usuarioExistente, ...nuevoUsuarioData };

    const [result] = await pool.execute(
      'UPDATE usuario SET idRol = ?,   identificacion = ?, nombre_usuario = ?, apellido_usuario = ?, telefono_usuario = ?, email_usuario = ?, password = ?, estado  = ? WHERE idUsuario = ?',
      [
        usuarioActualizado.idRol,
        usuarioActualizado.identificacion,
        usuarioActualizado.nombre_usuario,
        usuarioActualizado.apellido_usuario,
        usuarioActualizado.telefono_usuario,
        usuarioActualizado.email_usuario,
        usuarioActualizado.password,
        usuarioActualizado.estado,
        idUsuario
      ]
    );

    if (result.affectedRows === 0) {
      throw new Error('No se pudo actualizar el usuario');
    }

    return usuarioActualizado;
  } catch (error) {
    throw error;
  }
}

async function eliminarUsuario(idUsuario) {
  try {
    await deleteById(idUsuario);
    return { message: 'Usuario eliminado exitosamente' };
  } catch (error) {
    throw error;
  }
}

const cambiarContraseña = async (idUsuario, newPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const [result] = await pool.execute(
      'UPDATE usuario SET password = ?, firstLogin = 0 WHERE idUsuario = ?',
      [hashedPassword, idUsuario]
    );

    if (result.affectedRows === 0) {
      throw new Error('No se pudo cambiar la contraseña');
    }

    return { message: 'Contraseña cambiada exitosamente' };
  } catch (error) {
    throw error;
  }
};


const generarCodigoRestablecimiento = () => {
  return Math.random().toString(40).substring(2, 8).toUpperCase(); 
};

const enviarCorreoRestablecimiento = async (email_usuario, codigo) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    service: 'gmail',
    auth: {
      user: '20miTienda24@gmail.com',
      pass: 'k r p h a c o p i r k h v t y m'
    }
  });

  const mailOptions = {
    from: '20miTienda24@gmail.com',
    to: email_usuario,
    subject: 'Código para restablecimiento de Contraseña',
    html: `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 5px;
            padding: 30px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
          }
          p {
            color: #666;
          }
          .code {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Código de Restablecimiento de Contraseña</h1>
          <p>Estimado usuario,</p>
          <p>Tu código de restablecimiento es:</p>
          <p class="code">${codigo}</p>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo de restablecimiento enviado a', email_usuario);
  } catch (error) {
    console.error('Error al enviar el correo de restablecimiento:', error);
    throw error;
  }
};



const restablecerContraseña = async (email_usuario, codigo, nuevaContrasena) => {
  try {
    console.log(`Intento de restablecimiento de contraseña para ${email_usuario} con código ${codigo}`);

    // Buscar el usuario por correo electrónico y código de restablecimiento
    const usuario = await findOneByEmail(email_usuario);

    if (!usuario) {
      console.error(`Código de restablecimiento inválido para ${email_usuario}: ${codigo}`);
      throw new Error('Código de restablecimiento inválido');
    }

    // Verificar la vigencia del código de restablecimiento
    if (usuario.resetCode !== codigo || usuario.resetExpires < Date.now()) {
      console.error(`El código de restablecimiento ha caducado o es inválido para ${email_usuario}: ${codigo}`);
      throw new Error('El código de restablecimiento ha caducado o es inválido');
    }

    console.log(`Usuario encontrado para ${email_usuario}:`, usuario);

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(nuevaContrasena, 12);

    // Ejecutar una consulta SQL para actualizar la contraseña en la base de datos
    const [result] = await pool.execute(
      'UPDATE usuario SET password = ? WHERE email_usuario = ?',
      [hashedPassword, email_usuario]
    );

    // Verificar si la actualización fue exitosa
    if (result.affectedRows === 0) {
      throw new Error('No se pudo cambiar la contraseña');
    }

    // Limpiar el código de restablecimiento y la marca de tiempo de expiración
    usuario.resetCode = null;
    usuario.resetExpires = null;

    return { success: 'Contraseña restablecida con éxito' };
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    throw error;
  }
};


async function estadoDeUsuario(idUsuario, nuevoUsuarioData) {
  try {
    // Verificar si el usuario existe
    const usuarioExistente = await findByPk(idUsuario);
    if (!usuarioExistente) {
      throw new Error('El usuario no existe');
    }

    // Actualizar los campos del usuario existente con los nuevos datos
    const usuarioActualizado = { ...usuarioExistente, ...nuevoUsuarioData };

    // Realizar la actualización en la base de datos
    const [result] = await pool.execute(
      'UPDATE usuario SET estado = ? WHERE idUsuario = ?',
      [
        usuarioActualizado.estado,
        idUsuario
      ]
    );

    // Verificar si la actualización fue exitosa
    if (result.affectedRows === 0) {
      throw new Error('No se pudo actualizar el usuario');
    }

    return usuarioActualizado;
  } catch (error) {
    throw error;
  }
}

const cerrarSesion = async (token) => {
  try {
    // Agregar el token a la lista negra
    await listaNegraService.agregarToken(token);
    return { message: 'Sesión cerrada exitosamente' };
  } catch (error) {
    throw error;
  }
};

//listar usuario por id
const getUserById = async (idUsuario) => {
  try {
    const user = await findByPk(idUsuario);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    
    // Seleccionar solo los campos deseados del usuario
    const {  nombre_usuario, apellido_usuario, email_usuario, telefono_usuario, estado,Rol } = user;
    
    return {  nombre_usuario, apellido_usuario, email_usuario, telefono_usuario, estado, Rol };
  } catch (error) {
    throw new Error('Error al obtener el usuario por ID: ' + error.message);
  }
};


const enviarDatosUsuarioPorCorreo = async (idUsuario) => {
  try {
    const user = await findByPk(idUsuario);
    const Rol = user.idRol; 

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    let mensajeFirma = '';
    if (Rol === 8) {
      mensajeFirma = '<p>Por favor ingrese su firma digital despues de inicar Sesion</p>';
    }

    const correoOptions = {
      from: '20miTienda24@gmail.com',
      to: user.email_usuario,
      subject: 'Datos de Usuario para Ingreso',
      html: `
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
 body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 5px;
            padding: 30px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border: 2px solid #ccc; /* Añadir un borde sólido de 2px */
        }
        
        h1 {
            color: #333;
            margin-top: 0; /* Eliminar el margen superior del título */
        }
        
        .user-name {
            font-weight: bold;
        }
        
        .user-info {
            margin-top: 20px;
        }
        
        .user-info li {
            list-style: none;
            margin-bottom: 10px;
            font-size: 16px; /* Ajustar el tamaño de la fuente */
        }
        
        .user-info li span {
            font-weight: bold;
        }
       </style>
      </head>
      <body>
        <div class="container">
          <h1>Datos de Usuario para Ingreso </h1>
          <p>Estimado/a <span class="user-name">${user.nombre_usuario}</span>,</p>
          <p>A continuación se presentan sus credenciales:</p>
          <ul class="user-info">
            <li><span>Usuario:</span> ${user.email_usuario}</li>
            <li><span>Contraseña:</span> ${user.identificacion}</li>
            <!-- Agrega más campos según sea necesario -->
          </ul>
          ${mensajeFirma} <!-- Mensaje de firma condicional -->
        </div>
      </body>
      </html>
      `
    };

    // Configuración del transporte de correo (nodemailer)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      service: 'gmail',
      auth: {
        user: '20miTienda24@gmail.com',
        pass: 'k r p h a c o p i r k h v t y m'
      }
    });

    const info = await transporter.sendMail(correoOptions);
    console.log('Correo electrónico enviado:', info.response);
  } catch (error) {
    throw error;
  }
};


module.exports = {
    crearUsuario,
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
   enviarDatosUsuarioPorCorreo
};
