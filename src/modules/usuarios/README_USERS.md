# Módulo: Usuarios

## Descripción
El módulo de Usuarios gestiona todo lo relacionado con la creación, autenticación y administración de usuarios. Es fundamental para el control de acceso y permite que diferentes usuarios interactúen con la plataforma según su rol.

## Funcionalidad
- Registrar nuevos usuarios.
- Autenticar usuarios mediante JWT (JSON Web Token).
- Actualizar información de los usuarios.
- Recuperación de contraseñas (si está implementado).

## Estructura del Módulo
- **controllers**: Define la lógica para gestionar las operaciones sobre los usuarios (crear, actualizar, autenticar).
- **models**: Contiene la definición del esquema de usuario en la base de datos.
- **routes**: Define las rutas API que gestionan las operaciones relacionadas con los usuarios.
- **services**: Maneja la lógica de negocio, como la autenticación y las reglas de creación de usuarios.

## Relación con otros módulos
- Roles: Define el rol de un usuario al momento de registro.
- Autenticación: Utiliza el middleware de autenticación para proteger rutas.

## Ejemplo de uso

### Registrar un nuevo usuario:
```javascript
POST /api/users/register
Body: {
    "name": "Juan Perez",
    "email": "juan@example.com",
    "password": "securePassword123"
}

