using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoListAPI.Data;
using ToDoListAPI.Model;

namespace ToDoListAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ListaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ListaController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("ToDoList")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                List<Lista> lista = await _context.Listas.ToListAsync();
                return Ok(lista);
            }
            catch (Exception ex)
            {
                // Loguear el error y devolver una respuesta genérica
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Error al obtener la lista", error = ex.Message });
            }
        }

        [HttpGet]
        [Route("Detalle/{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                Lista lista = await _context.Listas.FindAsync(id);

                if (lista == null)
                {
                    return NotFound(new { message = "Tarea no encontrada" });
                }

                return Ok(lista);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Error al obtener la tarea", error = ex.Message });
            }
        }

        [HttpPost]
        [Route("Crear")]
        public async Task<IActionResult> Crear([FromBody] Lista lista)
        {
            try
            {
                if (lista == null)
                {
                    return BadRequest(new { message = "Datos inválidos" });
                }

                lista.createdAt = DateTime.Now;
                _context.Listas.Add(lista);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Tarea creada con éxito", lista });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Error al crear la tarea", error = ex.Message });
            }
        }

        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] Lista lista)
        {
            try
            {
                if (lista == null || lista.Id == 0)
                {
                    return BadRequest(new { message = "Datos inválidos o ID no especificado" });
                }

                var existingTask = await _context.Listas.FindAsync(lista.Id);
                if (existingTask == null)
                {
                    return NotFound(new { message = "Tarea no encontrada para editar" });
                }

                existingTask.Title = lista.Title;
                existingTask.Description = lista.Description;
                existingTask.isCompleted = lista.isCompleted;
                

                _context.Listas.Update(existingTask);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Tarea actualizada con éxito", existingTask });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Error al actualizar la tarea", error = ex.Message });
            }
        }

        [HttpDelete]
        [Route("Borrar/{id:int}")]
        public async Task<IActionResult> Borrar(int id)
        {
            try
            {
                var lista = await _context.Listas.FindAsync(id);

                if (lista == null)
                {
                    return NotFound(new { message = "Tarea no encontrada" });
                }

                _context.Listas.Remove(lista);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Tarea eliminada con éxito" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Error al eliminar la tarea", error = ex.Message });
            }
        }
    }
}
