### Módulo: **Roles**

```markdown
# Módulo: Roles

## Descripción
Este módulo se encarga de la gestión de roles dentro de la aplicación. Define los niveles de acceso y permisos de los usuarios según su rol (ej. Administrador, Cajero, Cliente).

## Funcionalidad
- Crear y gestionar roles.
- Asignar roles a usuarios.
- Verificar el rol de un usuario para dar acceso a ciertas funcionalidades.

## Estructura del Módulo
- **controllers**: Maneja la creación y asignación de roles.
- **models**: Define el esquema del rol en la base de datos.
- **routes**: Proporciona las rutas API para la gestión de roles.
- **services**: Contiene la lógica de negocio para asignar y verificar roles.

## Relación con otros módulos
- Usuarios: Los usuarios tienen roles asignados que definen sus permisos.
- Autenticación: El rol se utiliza para controlar el acceso a ciertas rutas protegidas.

## Ejemplo de uso

### Asignar un rol a un usuario:
```javascript
POST /api/roles/assign
Body: {
    "userId": "123456",
    "role": "admin"
}
