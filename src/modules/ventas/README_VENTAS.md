
### Módulo: **Ventas**

```markdown
# Módulo: Ventas

## Descripción
El módulo de Ventas gestiona todas las transacciones de ventas realizadas en la tienda, vinculando los productos con los clientes.

## Funcionalidad
- Registrar una venta con productos y cantidades.
- Actualizar el stock de productos vendidos.
- Calcular el total de la venta y generar facturas.

## Estructura del Módulo
- **controllers**: Maneja las solicitudes relacionadas con las ventas (registro de ventas, cálculo de totales).
- **models**: Esquema de la venta en la base de datos.
- **routes**: Define las rutas API para realizar ventas.
- **services**: Contiene la lógica de negocio para el procesamiento de ventas.

## Relación con otros módulos
- Productos: Actualiza el stock de productos vendidos.
- Clientes: Registra la venta asociada a un cliente específico.
- Facturación: Genera facturas basadas en las ventas.

## Ejemplo de uso

### Registrar una venta:
```javascript
POST /api/ventas
Body: {
    "clientId": "789123",
    "products": [
        {"productId": "123", "quantity": 2},
        {"productId": "456", "quantity": 1}
    ],
    "total": 1500
}
