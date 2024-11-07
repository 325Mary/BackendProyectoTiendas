const pool = require('../config/database');

const Tienda = {
  findAll: function() {
    return pool.execute('SELECT * FROM Tiendas');
  },
  create: function(TiendaData) {
    const sql = `INSERT INTO Tiendas (nombre, direccion, telefono, correo) VALUES (?, ?, ?, ?)`;
    return pool.execute(sql, [TiendaData.nombre, TiendaData.direccion, TiendaData.telefono, TiendaData.correo]);
  }
};

async function findOneTienda(nombre) {
  const [rows] = await pool.execute('SELECT * FROM Tiendas WHERE nombre = ?', [nombre]);
  return rows[0];
}

async function findByTienda(id) {
  const [rows] = await pool.execute('SELECT * FROM Tiendas WHERE id = ?', [id]);
  return rows[0];
}

async function deleteByIdTienda(id) {
  const [result] = await pool.execute('DELETE FROM Tiendas WHERE id = ?', [id]);
  return result;
}

module.exports = {
  Tienda,
  findByTienda,
  findOneTienda,
  deleteByIdTienda,
};
