
---

### Módulo: **Productos**

```markdown
# Módulo: Productos

## Descripción
El módulo de Productos gestiona todos los aspectos relacionados con los productos en el inventario de la tienda, incluyendo la creación, actualización, y control del stock.

## Funcionalidad
- Crear, actualizar y eliminar productos.
- Consultar detalles de productos y su stock.
- Manejar precios y categorías de los productos.

## Estructura del Módulo
- **controllers**: Define las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los productos.
- **models**: Esquema del producto en la base de datos (nombre, descripción, precio, stock).
- **routes**: Define las rutas API para las operaciones sobre productos.
- **services**: Contiene la lógica de negocio, como el control de stock y los cálculos de precio.

## Relación con otros módulos
- Ventas: Los productos están vinculados a cada venta realizada.
- Compras: Las compras de proveedores actualizan el stock de productos.

## Ejemplo de uso

### Registrar un nuevo producto:
```javascript
POST /api/productos
Body: {
    "name": "Laptop",
    "description": "Laptop de última generación",
    "price": 1000,
    "stock": 50,
    "category": "Electrónica"
}
