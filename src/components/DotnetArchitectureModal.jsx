import React, { useState } from 'react';
import { X, Code2, Database, Copy, Check, Terminal, FileCode, Sparkles } from 'lucide-react';

export const DotnetArchitectureModal = ({
  isOpen = false,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('controller');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const csharpController = `// Controllers/CoursesController.cs
using Microsoft.AspNetCore.Mvc;
using Supabase;
using AcademicHacks.Models;

namespace AcademicHacks.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoursesController : ControllerBase
    {
        private readonly Supabase.Client _supabase;

        public CoursesController(Supabase.Client supabase)
        {
            _supabase = supabase;
        }

        [HttpGet]
        public async Task<IActionResult> GetCourses([FromQuery] string? category, [FromQuery] string? batch)
        {
            var query = _supabase.From<CourseModel>();
            
            if (!string.IsNullOrEmpty(category))
                query = query.Where(x => x.Category == category);

            if (!string.IsNullOrEmpty(batch))
                query = query.Where(x => x.BatchYear == batch);

            var response = await query.Get();
            return Ok(response.Models);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCourseById(string id)
        {
            var response = await _supabase.From<CourseModel>()
                .Where(x => x.Id == id)
                .Single();

            if (response == null)
                return NotFound(new { message = "Course not found" });

            return Ok(response);
        }

        [HttpPost("enroll")]
        public async Task<IActionResult> Enroll([FromBody] EnrollmentRequest request)
        {
            var enrollment = new EnrollmentModel
            {
                UserId = request.UserId,
                CourseId = request.CourseId,
                EnrolledAt = DateTime.UtcNow,
                Status = "Active"
            };

            var response = await _supabase.From<EnrollmentModel>().Insert(enrollment);
            return Ok(response.Models.FirstOrDefault());
        }
    }
}`;

  const supabaseSql = `-- Supabase PostgreSQL Schema for Academic Hacks
-- Run this in your Supabase SQL Editor:

CREATE TABLE public.courses (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    subtitle TEXT,
    slug TEXT UNIQUE,
    category TEXT NOT NULL,
    batch_year TEXT,
    badge TEXT,
    exam_count INT DEFAULT 0,
    class_count INT DEFAULT 0,
    price INT NOT NULL DEFAULT 0,
    original_price INT,
    thumbnail TEXT NOT NULL,
    rating NUMERIC(3,2) DEFAULT 5.0,
    enrolled_students INT DEFAULT 0,
    description TEXT,
    features TEXT[],
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    course_id TEXT REFERENCES public.courses(id),
    enrolled_at TIMESTAMPTZ DEFAULT now(),
    status TEXT DEFAULT 'Active'
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Read policy for everyone
CREATE POLICY "Allow public read courses" ON public.courses
    FOR SELECT USING (true);

-- Authenticated enrollments policy
CREATE POLICY "Allow users to view own enrollments" ON public.enrollments
    FOR SELECT TO authenticated USING (auth.uid() = user_id);`;

  const csharpModel = `// Models/CourseModel.cs
using Postgrest.Attributes;
using Postgrest.Models;

namespace AcademicHacks.Models
{
    [Table("courses")]
    public class CourseModel : BaseModel
    {
        [PrimaryKey("id")]
        public string Id { get; set; } = string.Empty;

        [Column("title")]
        public string Title { get; set; } = string.Empty;

        [Column("subtitle")]
        public string? Subtitle { get; set; }

        [Column("category")]
        public string Category { get; set; } = string.Empty;

        [Column("batch_year")]
        public string? BatchYear { get; set; }

        [Column("price")]
        public int Price { get; set; }

        [Column("original_price")]
        public int? OriginalPrice { get; set; }

        [Column("thumbnail")]
        public string Thumbnail { get; set; } = string.Empty;

        [Column("exam_count")]
        public int ExamCount { get; set; }

        [Column("class_count")]
        public int ClassCount { get; set; }

        [Column("rating")]
        public decimal Rating { get; set; } = 5.0m;

        [Column("enrolled_students")]
        public int EnrolledStudents { get; set; }

        [Column("features")]
        public List<string> Features { get; set; } = new();
    }
}`;

  const programCs = `// Program.cs (.NET 8 Web API + Supabase C# SDK)
using Supabase;

var builder = WebApplication.CreateBuilder(args);

// Add Supabase Client
var supabaseUrl = builder.Configuration["Supabase:Url"] ?? "https://your-project.supabase.co";
var supabaseKey = builder.Configuration["Supabase:AnonKey"] ?? "your-anon-key";

var options = new SupabaseOptions
{
    AutoRefreshToken = true,
    AutoConnectRealtime = true
};

builder.Services.AddSingleton(provider => 
    new Supabase.Client(supabaseUrl, supabaseKey, options)
);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Enable CORS for React Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAcademicHacksFrontend", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowAcademicHacksFrontend");
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();`;

  const tabs = [
    { id: 'controller', label: 'CoursesController.cs', icon: Terminal, content: csharpController },
    { id: 'supabase_sql', label: 'PostgreSQL Schema (Supabase)', icon: Database, content: supabaseSql },
    { id: 'csharp_model', label: 'CourseModel.cs', icon: FileCode, content: csharpModel },
    { id: 'program', label: 'Program.cs (.NET 8)', icon: Code2, content: programCs }
  ];

  const currentTabObj = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-['Outfit',sans-serif]">
                  .NET Core Web API + Supabase PostgreSQL
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Ready Architecture
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Modern enterprise C# REST API controllers & PostgreSQL schema
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-4 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-mono font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-400 bg-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Code View Body */}
        <div className="relative flex-1 overflow-hidden flex flex-col bg-[#0b0f19]">
          <div className="absolute top-3 right-3 z-10">
            <button
              onClick={() => handleCopy(currentTabObj.content)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 shadow-md backdrop-blur-sm transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>কোড কপি করুন</span>
                </>
              )}
            </button>
          </div>

          <div className="p-5 overflow-auto flex-1 font-mono text-xs text-slate-300 leading-relaxed">
            <pre>
              <code>{currentTabObj.content}</code>
            </pre>
          </div>
        </div>

        {/* Footer info banner */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Directly copyable into ASP.NET Core 8 Web API project</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
};
