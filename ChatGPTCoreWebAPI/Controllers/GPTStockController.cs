using System;
using System.IO;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http.Extensions;
using ChatGPTCoreWebAPI.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System.Linq;
using System.Threading.Tasks;
using ExcelDataReader;
using System.Data;

namespace ChatGPTCoreWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class GPTStockController : ControllerBase
    {
        private readonly HttpClient _client;
        private readonly StockDbContext _context;
     
        public GPTStockController(StockDbContext context)
        {
            _context = context;
            _client = new HttpClient();
            _client.DefaultRequestHeaders.Add("authorization", "Bearer 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");
        }

        string answer="";

        /*   [HttpGet("getans")]
           public async Task<dynamic> GetStocksData()
           {
               return answer;
           }*/

        [HttpGet("getmessages/{id}")]
        public async Task<dynamic> GetMessagesByUserId(int id)
        {
            
            return await _context.chatmessages.Include(p => p.Messages).Where(u => u.UserId == id).ToListAsync();
           // return await _context.chatmessages.ToListAsync();
        }

        [HttpGet("getmessagesbychatId/{id}")]
        public async Task<dynamic> GetMessagesByChatId(int id)
        {
            // return await _context.chatmessages.Include(p => p.Messages).Where(u => u.ChatMessageId == id).ToListAsync();
            return await _context.chatmessages.Include(p => p.Messages).Where(u => u.ChatMessageId == id).ToListAsync();
        }

        [HttpPost("postmessage")]
        public async Task<IActionResult> PostMessage([FromBody] ChatMessages chatMessages)
        {
            if (chatMessages == null)
            {
                return BadRequest();
            }

            // Create a new row for the parent table
            ChatMessages newRow = new ChatMessages();

            // Copy the values from the newParentTable object to the newRow object
            newRow.UserId = chatMessages.UserId;
            newRow.Messages = chatMessages.Messages;

            // Create a new list of child table rows
            List<Messages> childTableRows = new List<Messages>();

            // Loop through each row in the child table of the newParentTable object
            foreach (Messages childTableRow in chatMessages.Messages)
            {
                // Create a new row for the child table
                Messages newChildTableRow = new Messages();

                // Copy the values from the childTableRow object to the newChildTableRow object
                newChildTableRow.UserId = childTableRow.UserId;
                newChildTableRow.Question = childTableRow.Question;
                newChildTableRow.Answer = childTableRow.Answer;
               

                // Add the new child table row to the list
                childTableRows.Add(newChildTableRow);
            }

            // Set the child table rows for the new parent table row
            newRow.Messages = childTableRows;

            // Add the new row to the parent table
            _context.chatmessages.Add(newRow);
            await _context.SaveChangesAsync();

            // Return a 201 Created response with the new row
            return CreatedAtAction("GetMessagesByUserId", new { id = newRow.ChatMessageId }, newRow);

          

            /*using (var dbContext = new chatmessages())
            {*/
            /*  foreach (var item in chatMessages)
              {
                  _context.chatmessages.Add(item);
              }
              await _context.SaveChangesAsync();*/
            /*}*/

            //_context.chatmessages.Add(chatMessages);
            //await _context.SaveChangesAsync();


           // return CreatedAtAction("GetMessages", new { id = chatMessages.ChatMessageId }, chatMessages);
        }

        [HttpPost("stocktable/{question}")]
        public async Task<dynamic> PostStockJsonDataAndReply([FromBody] JArray jsonStockDataArray, string question)
        {
            string jsonToString="";
            string finalPrompt = "";
            if (jsonStockDataArray is null)
            {
                return "Array is null";
            }
       
            foreach (var value in jsonStockDataArray)
            {
                dynamic obj = value;
                foreach (var property in obj)
                {
                    jsonToString +=  property.Name + property.Value;
                    //Console.WriteLine($"{property.Name}: {property.Value}");
                }
           
                finalPrompt += jsonToString;
            }
            
            answer = await Prompts(finalPrompt + question);
            return JsonConvert.SerializeObject(answer); 
        }


        private async Task<dynamic> Prompts(string prompt)
        {
            var m = new StringContent("{\"model\": \"text-davinci-003\", \"prompt\": \"" + prompt + "\", \"temperature\":1,\"max_tokens\":1000 }",
               Encoding.UTF8, "application/json");

            HttpResponseMessage response = await _client.PostAsync("https://api.openai.com/v1/completions", m);
            string responseString = await response.Content.ReadAsStringAsync();
            var str = JsonConvert.DeserializeObject<dynamic>(responseString);
            var ans = str.choices[0].text;
            return ans;
        }

    }

}

