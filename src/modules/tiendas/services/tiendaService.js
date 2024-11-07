const { Tienda, findByTienda, findOneTienda, deleteByIdTienda } = require('../models/tiendaModel');

async function crearTienda(TiendaData) {
  if (!TiendaData || !TiendaData.nombre) {
    throw new Error('Faltan datos de la Tienda');
  }

  const nuevaTienda = await Tienda.create(TiendaData);
  return nuevaTienda;
}

async function obtenerTiendas() {
  return await Tienda.findAll();
}

async function editarTienda(id, nuevaTiendaData) {
  const tiendaExistente = await findByTienda(id);
  if (!tiendaExistente) {
    throw new Error('La Tienda no existe');
  }

  const [result] = await pool.execute(
    'UPDATE Tiendas SET nombre = ?, direccion = ?, telefono = ?, correo = ? WHERE id = ?',
    [nuevaTiendaData.nombre, nuevaTiendaData.direccion, nuevaTiendaData.telefono, nuevaTiendaData.correo, id]
  );

  if (result.affectedRows === 0) {
    throw new Error('No se pudo actualizar la Tienda');
  }

  return { id, ...nuevaTiendaData };
}

async function eliminarTienda(id) {
  return await deleteByIdTienda(id);
}

module.exports = {
  crearTienda,
  obtenerTiendas,
  editarTienda,
  eliminarTienda
};
