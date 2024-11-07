const { Rol, findByRol, findOneRol, deleteByIdRol } = require('../models/RolModel');

async function crearRol(RolData) {
  if (!RolData || !RolData.Rol) {
    throw new Error('Faltan datos del Rol');
  }

  const nuevoRol = await Rol.create(RolData);
  return nuevoRol;
}

async function obtenerRoles() {
  return await Rol.findAll();
}

async function editarRol(idRol, nuevoRolData) {
  const RolExistente = await findByRol(idRol);
  if (!RolExistente) {
    throw new Error('El Rol no existe');
  }

  const [result] = await pool.execute(
    'UPDATE Rol SET Rol = ? WHERE idRol = ?',
    [nuevoRolData.Rol, idRol]
  );

  if (result.affectedRows === 0) {
    throw new Error('No se pudo actualizar el Rol');
  }

  return { idRol, Rol: nuevoRolData.Rol };
}

async function eliminarRol(idRol) {
  return await deleteByIdRol(idRol);
}

module.exports = {
  crearRol,
  obtenerRoles,
  editarRol,
  eliminarRol
};
