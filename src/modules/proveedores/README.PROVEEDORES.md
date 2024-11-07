
---

### Módulo: **Proveedores**

```markdown
# Módulo: Proveedores

## Descripción
El módulo de Proveedores permite gestionar la información de los proveedores que suministran productos a la tienda. Se utiliza para mantener un registro de los datos de contacto, historial de compras y condiciones de pago.

## Funcionalidad
- Registrar y gestionar proveedores.
- Consultar historial de compras de un proveedor.
- Actualizar información de los proveedores.

## Estructura del Módulo
- **controllers**: Gestiona las operaciones CRUD sobre los proveedores.
- **models**: Define el esquema de proveedor en la base de datos.
- **routes**: Define las rutas API para interactuar con los proveedores.
- **services**: Contiene la lógica de negocio para la gestión de proveedores.

## Relación con otros módulos
- Compras: Cada compra realizada está asociada a un proveedor.
- Productos: Los proveedores suministran productos que son gestionados en el inventario.

## Ejemplo de uso

### Registrar un nuevo proveedor:
```javascript
POST /api/proveedores
Body: {
    "name": "Proveedor ABC",
    "contact": {
        "email": "contacto@proveedorabc.com",
        "phone": "123456789"
    }
}
