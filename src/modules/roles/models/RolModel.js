const pool = require('../config/database');

const Rol = {
  findAll: function() {
    return pool.execute('SELECT * FROM Rol');
  },
  create: function(RolData) {
    const sql = `INSERT INTO Rol (Rol) VALUES (?)`;
    return pool.execute(sql, [RolData.Rol]);
  }
};

async function findOneRol(Rol) {
  const [rows] = await pool.execute('SELECT * FROM Rol WHERE Rol = ?', [Rol]);
  return rows[0];
}

async function findByRol(idRol) {
  const [rows] = await pool.execute('SELECT * FROM Rol WHERE idRol = ?', [idRol]);
  return rows[0];
}

async function deleteByIdRol(idRol) {
  const [result] = await pool.execute('DELETE FROM Rol WHERE idRol = ?', [idRol]);
  return result;
}

module.exports = {
  Rol,
  findByRol,
  findOneRol,
  deleteByIdRol,
};
