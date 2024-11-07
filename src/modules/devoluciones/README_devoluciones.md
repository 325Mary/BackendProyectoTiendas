
---

### Módulo: **Devoluciones**

```markdown
# Módulo: Devoluciones

## Descripción
Este módulo gestiona las devoluciones de productos, permitiendo registrar devoluciones, actualizar el inventario y generar reportes.

## Funcionalidad
- Registrar devoluciones de productos.
- Actualizar el stock en caso de devoluciones aceptadas.
- Consultar el historial de devoluciones.

## Estructura del Módulo
- **controllers**: Maneja las solicitudes para registrar y consultar devoluciones.
- **models**: Define el esquema de las devoluciones en la base de datos (producto, cantidad, razón, fecha).
- **routes**: Proporciona las rutas API para gestionar devoluciones.
- **services**: Contiene la lógica para procesar devoluciones y ajustar inventarios.

## Relación con otros módulos
- Ventas: Cada devolución está asociada a una venta previa.
- Inventario: Actualiza el stock de productos devueltos.

## Ejemplo de uso

### Registrar una devolución:
```javascript
POST /api/devoluciones
Body: {
    "ventaId": "789123",
    "productoId": "123",
    "cantidad": 1,
    "razon": "Defectuoso"
}
