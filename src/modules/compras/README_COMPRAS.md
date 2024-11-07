# Módulo: Compras

## Descripción
Este módulo gestiona las compras que la tienda realiza a sus proveedores. Permite registrar nuevas compras, actualizar el inventario y generar reportes sobre las adquisiciones.

## Funcionalidad
- Registrar nuevas compras.
- Actualizar el stock de los productos adquiridos.
- Consultar el historial de compras.

## Estructura del Módulo
- **controllers**: Maneja las solicitudes relacionadas con las compras, como registrar y consultar compras.
- **models**: Define el esquema de las compras en la base de datos (productos, cantidades, proveedor, fecha).
- **routes**: Proporciona las rutas API para las operaciones de compras.
- **services**: Contiene la lógica de negocio para procesar las compras y actualizar el stock.

## Relación con otros módulos
- Proveedores: Registra las compras realizadas a proveedores específicos.
- Productos: Actualiza el stock de productos adquiridos.

## Ejemplo de uso

### Registrar una nueva compra:
```javascript
POST /api/compras
Body: {
    "proveedorId": "56789",
    "products": [
        {"productId": "123", "quantity": 50},
        {"productId": "456", "quantity": 100}
    ],
    "total": 2000
}
