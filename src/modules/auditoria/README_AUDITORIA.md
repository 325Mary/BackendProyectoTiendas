# Módulo: Auditoría

## Descripción
El módulo de Auditoría se encarga de registrar todas las acciones relevantes realizadas en el sistema, permitiendo rastrear los cambios en los datos críticos de la tienda (usuarios, inventario, ventas, compras, etc.).

## Funcionalidad
- Registrar eventos y acciones realizadas por los usuarios.
- Consultar el historial de cambios.
- Generar reportes de auditoría.

## Estructura del Módulo
- **controllers**: Gestiona las peticiones para consultar el historial de auditoría.
- **models**: Define el esquema de los eventos auditados (tipo de evento, usuario, fecha, cambios).
- **routes**: Define las rutas API para interactuar con el historial de auditoría.
- **services**: Contiene la lógica para registrar eventos importantes.

## Relación con otros módulos
- Usuarios: Rastrea las acciones realizadas por los usuarios.
- Ventas y Compras: Registra las transacciones comerciales.
- Inventario: Audita los cambios en el stock de productos.

## Ejemplo de uso

### Consultar eventos de auditoría:
```javascript
GET /api/auditoria
Params: {
    "startDate": "2024-01-01",
    "endDate": "2024-01-31"
}
