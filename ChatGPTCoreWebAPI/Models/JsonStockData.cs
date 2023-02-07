using System.ComponentModel.DataAnnotations;

namespace ChatGPTCoreWebAPI.Models
{
    public class JsonStockData
    {
        [Key]
        public int Id { get; set; }
        public string Ticker { get; set; }
        public float PurchasePrice { get; set; }
        public int Quantity { get; set; }
        public float CurrentPrice { get; set; }

    }
}
