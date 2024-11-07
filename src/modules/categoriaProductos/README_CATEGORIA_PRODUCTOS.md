
---

### Módulo: **Categoría de Productos**

```markdown
# Módulo: Categoría de Productos

## Descripción
Este módulo permite gestionar las categorías en las que se agrupan los productos de la tienda, facilitando la organización y la búsqueda de productos.

## Funcionalidad
- Crear, editar y eliminar categorías de productos.
- Relacionar productos con categorías.
- Consultar productos por categoría.

## Estructura del Módulo
- **controllers**: Gestiona las operaciones CRUD para las categorías.
- **models**: Define el esquema de las categorías en la base de datos.
- **routes**: Proporciona las rutas API para interactuar con las categorías.
- **services**: Contiene la lógica para gestionar las categorías y su relación con los productos.

## Relación con otros módulos
- Productos: Cada producto debe estar asociado a una categoría para facilitar su gestión.

## Ejemplo de uso

### Crear una nueva categoría:
```javascript
POST /api/categorias
Body: {
    "name": "Electrónica",
    "description": "Productos electrónicos y gadgets"
}
