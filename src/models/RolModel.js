const mysql = require('mysql2');


const pool = require('../config/database');

const Rol = {
  findAll: function() {
    return pool.execute('SELECT * FROM Rol'); // Utiliza pool.execute() para obtener una promesa
  },
  create: function(RolData) {
    const sql = `INSERT INTO Rol ( Rol) VALUES ( ?)`;
    return pool.execute(sql, [ RolData.Rol]);
  }
};
async function findOneRol(Rol) {
  const [rows, fields] = await pool.execute('SELECT * FROM Rol WHERE Rol = ?', [Rol]);
  return rows[0];
}


async function findByRol (idRol) {
    const [rows, fields] = await pool.execute(`SELECT * FROM Rol WHERE idRol = ?` , [idRol]);
    return rows[0];    throw error;
  }

async function deleteByIdRol(idRol) {
    try {
      const [result] = await pool.execute('DELETE FROM Rol WHERE idRol = ?', [idRol]);
      if (result.affectedRows === 0) {
        throw new Error('El Rol no existe');
      }
      return { message: 'Rol eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }
  


module.exports = {Rol     ,
    findByRol,
    findOneRol,
    deleteByIdRol,
  };
