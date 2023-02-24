using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChatGPTCoreWebAPI.Models
{
    public class ChatMessages
    {
        [Key]
        public int ChatMessageId { get; set; }
        public int UserId { get; set; }
        public List<Messages> Messages { get; set; }

    }

    public class Messages
    {
        [Key]
        public int MessageId { get; set; }
        public int UserId { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }

    }
}

