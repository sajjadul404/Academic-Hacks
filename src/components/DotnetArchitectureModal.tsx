import React, { useState } from 'react';
import { X, Code2, Database, Copy, Check, Terminal, FileCode, Sparkles } from 'lucide-react';

interface DotnetArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DotnetArchitectureModal: React.FC<DotnetArchitectureModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'controller' | 'supabase_sql' | 'csharp_model' | 'program'>('controller');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
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
                Id = Guid.NewGuid().ToString(),
                UserId = request.UserId,
                CourseId = request.CourseId,
                EnrolledAt = DateTime.UtcNow,
                PaymentStatus = "Completed",
                TransactionId = request.TransactionId
            };

            await _supabase.From<EnrollmentModel>().Insert(enrollment);
            return Ok(new { success = true, enrollmentId = enrollment.Id });
        }
    }
}`;

  const supabaseSql = `-- Supabase PostgreSQL Schema for Academic Hacks
-- Run this in your Supabase SQL Editor:

CREATE TABLE public.courses (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    subtitle TEXT,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    batch_year TEXT,
    badge TEXT,
    exam_count INT DEFAULT 0,
    class_count INT DEFAULT 0,
    price NUMERIC NOT NULL,
    original_price NUMERIC,
    thumbnail TEXT,
    rating NUMERIC DEFAULT 5.0,
    enrolled_students INT DEFAULT 0,
    description TEXT,
    features TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.enrollments (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
    payment_status TEXT DEFAULT 'Completed',
    transaction_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Allow users to view own enrollments" ON public.enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow users to insert enrollments" ON public.enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);`;

  const csharpModel = `// Models/CourseModel.cs
using Postgrest.Attributes;
using Postgrest.Models;

namespace AcademicHacks.Models
{
    [Table("courses")]
    public class CourseModel : BaseModel
    {
        [PrimaryKey("id", false)]
        public string Id { get; set; } = string.Empty;

        [Column("title")]
        public string Title { get; set; } = string.Empty;

        [Column("subtitle")]
        public string? Subtitle { get; set; }

        [Column("slug")]
        public string Slug { get; set; } = string.Empty;

        [Column("category")]
        public string Category { get; set; } = string.Empty;

        [Column("batch_year")]
        public string? BatchYear { get; set; }

        [Column("badge")]
        public string? Badge { get; set; }

        [Column("exam_count")]
        public int ExamCount { get; set; }

        [Column("class_count")]
        public int ClassCount { get; set; }

        [Column("price")]
        public decimal Price { get; set; }

        [Column("original_price")]
        public decimal? OriginalPrice { get; set; }

        [Column("thumbnail")]
        public string Thumbnail { get; set; } = string.Empty;

        [Column("rating")]
        public decimal Rating { get; set; } = 5.0m;

        [Column("enrolled_students")]
        public int EnrolledStudents { get; set; }
    }
}`;

  const programCs = `// Program.cs (.NET 8 + Supabase C# SDK)
using Supabase;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure Supabase Client in DI
var supabaseUrl = builder.Configuration["Supabase:Url"]!;
var supabaseKey = builder.Configuration["Supabase:AnonKey"]!;

builder.Services.AddScoped(_ => 
    new Supabase.Client(supabaseUrl, supabaseKey, new SupabaseOptions
    {
        AutoRefreshToken = true,
        AutoConnectRealtime = true
    }));

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

  const getActiveCode = () => {
    switch (activeTab) {
      case 'controller': return csharpController;
      case 'supabase_sql': return supabaseSql;
      case 'csharp_model': return csharpModel;
      case 'program': return programCs;
      default: return csharpController;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">.NET 8 C# Web API + Supabase Backend</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Ready to Use
                </span>
              </div>
              <p className="text-xs text-slate-400">
                You requested .NET with Supabase Database — here is the complete clean backend architecture
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
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 gap-2">
          {[
            { id: 'controller', label: 'C# Controller (CoursesController.cs)' },
            { id: 'csharp_model', label: 'C# Postgrest Model' },
            { id: 'supabase_sql', label: 'Supabase SQL Schema' },
            { id: 'program', label: 'Program.cs Setup' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code View Body */}
        <div className="flex-1 overflow-y-auto p-5 relative bg-[#0d1117] font-mono text-xs text-slate-300">
          <button
            onClick={() => handleCopy(getActiveCode())}
            className="absolute top-7 right-7 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 border border-slate-700 transition-all cursor-pointer shadow"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>

          <pre className="overflow-x-auto p-2 leading-relaxed">
            <code>{getActiveCode()}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Supabase C# client package: <code className="text-indigo-400">supabase-csharp</code> / <code className="text-indigo-400">postgrest-csharp</code></span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
};
