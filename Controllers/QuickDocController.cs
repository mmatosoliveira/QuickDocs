using Microsoft.AspNetCore.Mvc;

namespace QuickDocs.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class QuickDocController : ControllerBase
    {
        private readonly QuickDocManager _manager;

        public QuickDocController(QuickDocManager manager)
        {
            _manager = manager;
        }

        [HttpGet]
        public IActionResult ObterDocs()
        {
            return Ok(_manager.GetDocs());
        }

        [HttpPost]
        public IActionResult SaveDoc(ItemDoc doc)
        {
            return Ok(_manager.SaveDoc(doc));
        }

        [HttpGet]
        public IActionResult DeleteDoc(string id)
        {
            return Ok(_manager.DeleteDoc(id));
        }

        [HttpGet]
        public IActionResult ObterTodasCategorias()
        {
            return Ok(_manager.ObterTodasCategorias());
        }
    }
}