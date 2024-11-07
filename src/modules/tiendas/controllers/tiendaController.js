const { ResponseStructure } = require('../../../helpers/ResponseStructure');
const {
  crearTienda,
  obtenerTiendas,
  editarTienda,
  eliminarTienda,
} = require('../services/tiendaService');
const { findOneTienda } = require('../models/tiendaModel');

const controller = {};

controller.crearTiendaC = async (req, res, next) => {
  try {
    const TiendaData = req.body;

    const tiendaExistente = await findOneTienda(TiendaData.nombre);
    if (tiendaExistente) {
      return res.status(400).json(ResponseStructure.error('La Tienda ya está registrada', 400));
    }

    const nuevaTienda = await crearTienda(TiendaData);
    return res.status(201).json(ResponseStructure.success(nuevaTienda, 'Tienda creada exitosamente'));
  } catch (error) {
    return res.status(500).json(ResponseStructure.error(error.message, 500));
  }
};

controller.obtenerTiendasC = async (req, res, next) => {
  try {
    const tiendas = await obtenerTiendas();
    return res.status(200).json(ResponseStructure.success(tiendas, 'Tiendas obtenidas correctamente'));
  } catch (error) {
    return res.status(500).json(ResponseStructure.error('No se pudieron obtener las Tiendas', 500));
  }
};

controller.editarTiendaC = async (req, res, next) => {
  try {
    const id = req.params.id;
    const nuevaTiendaData = req.body;

    if (Object.keys(nuevaTiendaData).length === 0) {
      return res.status(400).json(ResponseStructure.error('El cuerpo de la solicitud está vacío', 400));
    }

    const tiendaActualizada = await editarTienda(id, nuevaTiendaData);
    return res.status(200).json(ResponseStructure.success(tiendaActualizada, 'Tienda actualizada exitosamente'));
  } catch (error) {
    return res.status(404).json(ResponseStructure.error('No se pudo actualizar la Tienda', 404));
  }
};

controller.eliminarTiendaC = async (req, res, next) => {
  try {
    const id = req.params.id;
    await eliminarTienda(id);
    return res.status(200).json(ResponseStructure.success({}, 'Tienda eliminada exitosamente'));
  } catch (error) {
    return res.status(404).json(ResponseStructure.error(`No se encontró la Tienda con ID ${id}`, 404));
  }
};

module.exports = controller;
