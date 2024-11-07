
---

### Módulo: **Clientes**

```markdown
# Módulo: Clientes

## Descripción
Este módulo gestiona toda la información relacionada con los clientes de la tienda, incluyendo datos personales e historial de compras.

## Funcionalidad
- Registrar nuevos clientes.
- Actualizar la información de clientes.
- Consultar historial de compras de cada cliente.

## Estructura del Módulo
- **controllers**: Gestiona las operaciones CRUD sobre los clientes.
- **models**: Esquema del cliente en la base de datos.
- **routes**: Define las rutas API para interactuar con clientes.
- **services**: Contiene la lógica de negocio relacionada con clientes.

## Relación con otros módulos
- Ventas: Cada venta puede estar asociada a un cliente.
- Informes: Los informes de ventas pueden filtrar por cliente.

## Ejemplo de uso

### Registrar un nuevo cliente:
```javascript
POST /api/clientes
Body: {
    "name": "Carlos González",
    "email": "carlos@example.com",
    "phone": "123456789"
}
