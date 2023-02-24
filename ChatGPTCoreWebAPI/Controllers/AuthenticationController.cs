using Microsoft.AspNetCore.Mvc;

namespace ChatGPTCoreWebAPI.Controllers
{
    public class AuthenticationController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
