# PruebaTecnica
# To-Do List Application
## Requisitos
- .NET Core SDK
- Reacj.js
- SQL Server
## Configuración del Backend
1. Clonar el repositorio.
2. Configurar la cadena de conexión en appsettings.json.
3. Ejecutar las migraciones de Entity Framework Core con update-database.
4. Iniciar el proyecto.
## Configuración del Frontend
1. Navegar al directorio clientapp y ejecutar npm install.
2. En el archivo de api.js modificar el puerto de la API si es necesario.
2. Ejecutar npm run dev para iniciar la aplicación de React.
## Endpoints de la API
- GET /api/Lista/ToDoList: Obtener todas las tareas.
- POST /api/Lista/Crear: Crear una nueva tarea.
- PUT /api/Lista/Editar/{id}: Actualizar una tarea existente.
- DELETE /api/Lista/Borrar/{id}: Eliminar una tarea.
