# Módulo de Tiendas

## Descripción
Este módulo se encarga de gestionar las tiendas registradas en la aplicación. Cada tienda representa una unidad independiente dentro de la plataforma multitenant, y está asociada a varios elementos como usuarios, productos, ventas, y otros recursos.

## Funcionalidades principales
- Registro de nuevas tiendas.
- Gestión de la información de cada tienda (nombre, ubicación, contacto, etc.).
- Relación de las tiendas con los usuarios, productos, y ventas.
- Actualización y eliminación de tiendas.

## Estructura de la base de datos
El módulo de Tiendas tiene una tabla principal llamada `Tiendas`, la cual contiene los siguientes campos:
- `id`: Identificador único de la tienda (clave primaria).
- `nombre`: Nombre de la tienda.
- `direccion`: Dirección física de la tienda.
- `telefono`: Número de contacto de la tienda.
- `correo`: Correo electrónico de contacto de la tienda.

### Relación con otros módulos
- **Usuarios**: Cada usuario está asociado a una tienda, lo que permite realizar operaciones multitenant. 
- **Productos**: Los productos registrados están asociados a la tienda a la que pertenecen.
- **Ventas**: Cada venta realizada en el sistema está vinculada a una tienda específica.
- **Facturas**: Las facturas generadas corresponden a ventas realizadas en una tienda determinada.

## Relación con otros módulos
- **Usuarios**: Cada usuario registrado está asociado a una tienda, permitiendo una gestión separada por tienda.
- **Ventas**: Todas las ventas realizadas deben estar asociadas a una tienda.
- **Productos**: Los productos gestionados en el sistema están registrados dentro de una tienda específica.

## API Endpoints
Este módulo expone los siguientes endpoints para la gestión de tiendas:

- `POST /tiendas`: Registrar una nueva tienda.
- `GET /tiendas/:id`: Obtener información de una tienda específica.
- `PUT /tiendas/:id`: Actualizar los datos de una tienda.
- `DELETE /tiendas/:id`: Eliminar una tienda.

## Instalación y configuración
No requiere configuraciones adicionales específicas. El módulo se integra automáticamente dentro de la arquitectura del proyecto.

## Consideraciones
- Este módulo es fundamental para la correcta funcionalidad de la aplicación multitenant. Asegúrese de que cada entidad (usuarios, productos, ventas) esté correctamente asociada a una tienda para evitar inconsistencias.
