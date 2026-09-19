using EduPath.BlazorApp.Models;
using EduPath.BlazorApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace EduPath.BlazorApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SpotlightController : ControllerBase
{
    private readonly ICourseService _courseService;

    public SpotlightController(ICourseService courseService)
    {
        _courseService = courseService;
    }

    [HttpGet]
    public async Task<ActionResult<List<SpotlightItem>>> GetSpotlights()
    {
        var items = await _courseService.GetSpotlightItemsAsync();
        return Ok(items);
    }
}
