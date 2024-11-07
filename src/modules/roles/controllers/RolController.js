const { ResponseStructure } = require('../../../helpers/ResponseStructure');
const {
  crearRol,
  obtenerRoles,
  editarRol,
  eliminarRol,
} = require('../services/RolService');
const { findOneRol } = require('../models/RolModel');

const controller = {};

controller.crearRolC = async (req, res, next) => {
  try {
    const RolData = req.body;

    const RolExistente = await findOneRol(RolData.Rol);
    if (RolExistente) {
      return res.status(400).json(ResponseStructure.error('El Rol ya está registrado', 400));
    }

    const nuevoRol = await crearRol(RolData);
    return res.status(201).json(ResponseStructure.success(nuevoRol, 'Rol creado exitosamente'));
  } catch (error) {
    return res.status(500).json(ResponseStructure.error(error.message, 500));
  }
};

controller.obtenerRolesC = async (req, res, next) => {
  try {
    const roles = await obtenerRoles();
    return res.status(200).json(ResponseStructure.success(roles, 'Roles obtenidos correctamente'));
  } catch (error) {
    return res.status(500).json(ResponseStructure.error('No se pudieron obtener los Roles', 500));
  }
};

controller.editarRolC = async (req, res, next) => {
  try {
    const idRol = req.params.idRol;
    const nuevoRolData = req.body;

    if (Object.keys(nuevoRolData).length === 0) {
      return res.status(400).json(ResponseStructure.error('El cuerpo de la solicitud está vacío', 400));
    }

    const rolActualizado = await editarRol(idRol, nuevoRolData);
    return res.status(200).json(ResponseStructure.success(rolActualizado, 'Rol actualizado exitosamente'));
  } catch (error) {
    return res.status(404).json(ResponseStructure.error('No se pudo actualizar el Rol', 404));
  }
};

controller.eliminarRolC = async (req, res, next) => {
  try {
    const idRol = req.params.idRol;
    await eliminarRol(idRol);
    return res.status(200).json(ResponseStructure.success({}, 'Rol eliminado exitosamente'));
  } catch (error) {
    return res.status(404).json(ResponseStructure.error(`No se encontró el Rol con ID ${idRol}`, 404));
  }
};

module.exports = controller;
