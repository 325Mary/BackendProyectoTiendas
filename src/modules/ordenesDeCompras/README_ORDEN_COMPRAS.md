
---

### Módulo: **Órdenes de Compra**

```markdown
# Módulo: Órdenes de Compra

## Descripción
El módulo de Órdenes de Compra gestiona el proceso de creación y administración de órdenes de compra realizadas a los proveedores para abastecer el inventario de la tienda.

## Funcionalidad
- Crear órdenes de compra.
- Consultar el estado de las órdenes de compra.
- Registrar la recepción de los productos solicitados.

## Estructura del Módulo
- **controllers**: Gestiona las solicitudes para crear y consultar órdenes de compra.
- **models**: Define el esquema de las órdenes de compra (productos, cantidades, proveedor, estado).
- **routes**: Proporciona las rutas API para interactuar con las órdenes de compra.
- **services**: Contiene la lógica para procesar las órdenes de compra y actualizar inventarios.

## Relación con otros módulos
- Compras: Cada orden de compra genera una compra una vez recibidos los productos.
- Inventario: Actualiza el stock al recibir los productos solicitados.

## Ejemplo de uso

### Crear una orden de compra:
```javascript
POST /api/ordenes-de-compra
Body: {
    "proveedorId": "56789",
    "productos": [
        {"productoId": "123", "cantidad": 100},
        {"productoId": "456", "cantidad": 50}
    ]
}
