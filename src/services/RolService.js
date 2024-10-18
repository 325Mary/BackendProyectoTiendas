const {Rol,
    findByRol,
    findOneRol,
    deleteByIdRol,} = require('../models/RolModel');
 const pool = require('../config/database');

 async function crearRol(RolData) {
   try {
       if (!RolData  || !RolData.Rol ) {
           throw new Error('Faltan datos del Rol');
       }
 

       const nuevoRol = await Rol.create(RolData);
       return nuevoRol;
   } catch (error) {
       throw error;
   }
 }
 
 const obtenerRoles = async () => {
   try {
     const Roles = await Rol.findAll();
     return Roles;
   } catch (error) {
     throw error;
   }
 };
 
 


 
 async function editarRol(idRol, nuevoRolData) {
   try {
     const RolExistente = await findByRol(idRol);
     if (!RolExistente) {
       throw new Error('El Rol no existe');
     }
 
     const RolActualizado = { ...RolExistente, ...nuevoRolData };
 
     // Realizar la actualización en la base de datos
     const [result] = await pool.execute(
       'UPDATE Rol SET  Rol = ? WHERE idRol = ?',
       [
        RolActualizado.Rol,
         idRol
       ]
     );
 
     // Verificar si la actualización fue exitosa
     if (result.affectedRows === 0) {
       throw new Error('No se pudo actualizar el Rol');
     }
 
     return RolActualizado;
   } catch (error) {
     throw error;
   }
 }
 
 async function eliminarRol(idRol) {
   try {
     await deleteByIdRol(idRol);
     return { message: 'Rol eliminado exitosamente' };
   } catch (error) {
     throw error;
   }
 }
 

 

 
 
 
 
 module.exports = {
    crearRol,
    obtenerRoles,
    editarRol,
    eliminarRol
 };
 
