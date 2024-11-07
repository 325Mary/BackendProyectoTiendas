
---

### Módulo: **Descuentos**

```markdown
# Módulo: Descuentos

## Descripción
El módulo de Descuentos permite aplicar descuentos a productos o a órdenes de compra, facilitando promociones y ofertas.

## Funcionalidad
- Crear y gestionar descuentos por porcentaje o cantidad.
- Aplicar descuentos a productos o categorías específicas.
- Aplicar descuentos en órdenes de compra o en ventas.

## Estructura del Módulo
- **controllers**: Gestiona las operaciones de creación y aplicación de descuentos.
- **models**: Define el esquema de los descuentos en la base de datos.
- **routes**: Proporciona las rutas API para gestionar los descuentos.
- **services**: Contiene la lógica para aplicar los descuentos en las transacciones.

## Relación con otros módulos
- Ventas: Se aplica el descuento en las transacciones de venta.
- Categoría de Productos: Se pueden aplicar descuentos a categorías enteras.

## Ejemplo de uso

### Aplicar un descuento:
```javascript
POST /api/descuentos/aplicar
Body: {
    "productoId": "123",
    "descuento": 15  // Porcentaje de descuento
}
