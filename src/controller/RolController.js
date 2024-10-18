const { ResponseStructure } = require('../helpers/ResponseStructure');
const validarCamposRequeridos = require('../middleware/camposrequeridosUser');
const {crearRol,
    obtenerRoles,
    editarRol,
    eliminarRol } = require('../services/RolService');
const {findOneRol} = require('../models/RolModel')


const controller = {}

controller.crearRolC = async (req, res, next) => {
  try {
    validarCamposRequeridos(['Rol'])(req, res, async () => {
      const RolData = req.body;

      const RolExistente= await findOneRol(RolData.Rol);
      if(RolExistente){
      return res.status(400).json({ ...ResponseStructure, status: 400, message: 'El Rol  ya está registrado' });
      }
      const Rol = await crearRol(RolData);
      res.status(201).json({ ...ResponseStructure, message: 'Rol creado exitosamente', data: Rol });
    });
  } catch (error) {
    next(error);
  }
};

controller.obtenerRolesC = async (req, res, next) => {
  try {
    const listRoles = await obtenerRoles();
    res.status(200).json({ ...ResponseStructure, data: listRoles });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se obtuvieron los Roles' });
  }
};

controller.editarRolC = async (req, res, next) => {
  try {
    const idRol = req.params.idRol;
    const nuevoRolData = req.body;

    // Verificar si el cuerpo de la solicitud está vacío
    if (Object.keys(nuevoRolData).length === 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud está vacío' });
    }

    // Verificar si todos los campos recibidos están en el cuerpo de la solicitud
    const RolActualizado = await editarRol(idRol, nuevoRolData);
    res.status(200).json({ ...ResponseStructure, message: 'Rol actualizado exitosamente', data: RolActualizado });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se actualizó ningún Rol con el ID proporcionado' });
  }
};


controller.eliminarRolC = async (req, res, next) => {
  try {
    const idRol = req.params.idRol;
    await eliminarRol(idRol);
    res.status(200).json({ ...ResponseStructure, message: 'Rol eliminado exitosamente' });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: `No se encontró ningún Rol con el ID ${req.params.idRol} proporcionado` });
  }
};

module.exports = controller;
