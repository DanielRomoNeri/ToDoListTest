using System.ComponentModel.DataAnnotations;

namespace ToDoListAPI.Model
{
    public class Lista
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public bool isCompleted { get; set; }

         public DateTime createdAt { get; set; }
    }
}
