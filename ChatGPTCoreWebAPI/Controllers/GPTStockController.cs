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

        [HttpPost("stocktable/{question}")]
        public async Task<dynamic> PostStockJsonDataAndReply([FromBody] JArray jsonStockDataArray, string question)
        {
            string jsonToString="";
            string finalPrompt = "";
            if (jsonStockDataArray is null)
            {
                return "Array is null";
            }

            //var toString =jsonStockDataArray.ToString();
           // finalPrompt = toString.Replace('[', ' ').Replace(']', ' ').Replace('{', ' ').Replace('}', ' ');


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

