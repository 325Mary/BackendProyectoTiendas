const mysql = require('mysql2');


const pool = require('../config/database');

const Usuario = {
  findAll: function() {
    const sql = `
      SELECT usuario.*, 
             Rol.Rol AS nombre_Rol
      FROM usuario
      INNER JOIN Rol ON usuario.idRol = Rol.idRol
    `;
    return pool.execute(sql);
  },
  create: function(usuarioData) {
    const sql = `INSERT INTO usuario (idRol, idTienda,  identificacion, nombre_usuario, apellido_usuario, telefono_usuario, email_usuario, password, estado, firstLogin) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    return pool.execute(sql, [usuarioData.idRol, usuarioData.idTienda, usuarioData.identificacion, usuarioData.nombre_usuario, usuarioData.apellido_usuario, usuarioData.telefono_usuario, usuarioData.email_usuario, usuarioData.password, usuarioData.estado, usuarioData.firstLogin]);
  }
};

async function findOneByEmail(email_usuario) {
  const [rows, fields] = await pool.execute('SELECT * FROM usuario WHERE email_usuario = ?', [email_usuario]);
  return rows[0];
}


async function findByPk(idUsuario) {
  try {
    const query = `
      SELECT 
        usuario.*,
        Rol.Rol
      FROM 
        usuario
      JOIN 
        Rol ON usuario.idRol = Rol.idRol
      WHERE 
        usuario.idUsuario = ?
    `;

    const [rows, fields] = await pool.execute(query, [idUsuario]);
    
    return rows[0];
  } catch (error) {
    throw error;
  }
}


async function deleteById(idUsuario) {
    try {
      const [result] = await pool.execute('DELETE FROM usuario WHERE idUsuario = ?', [idUsuario]);
      if (result.affectedRows === 0) {
        throw new Error('El usuario no existe');
      }
      return { message: 'Usuario eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }
  


module.exports = {Usuario,
  findOneByEmail,
  findByPk,
  deleteById};
