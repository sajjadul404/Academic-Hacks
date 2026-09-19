using EduPath.BlazorApp.Models;

namespace EduPath.BlazorApp.Services;

public interface ICourseService
{
    Task<List<SpotlightItem>> GetSpotlightItemsAsync();
}

public class CourseService : ICourseService
{
    private static readonly List<SpotlightItem> Spotlights = new()
    {
        new SpotlightItem
        {
            Id = "sp_04",
            Code = "04",
            Name = "Sentinel",
            Category = "Engineering Apex",
            BadgeText = "Top 10 Merit",
            Title = "BUET & Engineering Apex Physics 2026",
            Subtitle = "Advanced mechanics, electromagnetism & problem-solving blueprints.",
            Image = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
            AccentColor = "#38bdf8",
            Description = "Comprehensive calculus & physics for top engineering universities."
        },
        new SpotlightItem
        {
            Id = "sp_03",
            Code = "03",
            Name = "Vanta",
            Category = "Medical Elite",
            BadgeText = "DMC Elite",
            Title = "Medical Biology & Botany Concept Booster",
            Subtitle = "High-yield NCERT/Abul Hasan Biology, Botanics line-by-line.",
            Image = "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
            AccentColor = "#c084fc",
            Description = "Specialized medical question solve and daily model tests."
        },
        new SpotlightItem
        {
            Id = "sp_02",
            Code = "02",
            Name = "Velocity",
            Category = "Admission Apex",
            BadgeText = "Turbo Apex",
            Title = "Target DU 'Ka' Unit Math & Speed Analysis",
            Subtitle = "Calculus shortcuts, analytical tricks & high-speed MCQ mastery.",
            Image = "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80",
            AccentColor = "#818cf8",
            Description = "Fast-track mathematics preparation for Dhaka University."
        },
        new SpotlightItem
        {
            Id = "sp_01",
            Code = "01",
            Name = "Azure",
            Category = "Medical Turbo",
            BadgeText = "Chemistry Gold",
            Title = "Chemistry 1st & 2nd Paper Master Series",
            Subtitle = "Organic reaction mechanisms, stoichiometry & laboratory guides.",
            Image = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
            AccentColor = "#38bdf8",
            Description = "Organic chemistry mechanisms and reaction pathways made easy."
        },
        new SpotlightItem
        {
            Id = "sp_07",
            Code = "07",
            Name = "Rael",
            Category = "Business Elite",
            BadgeText = "IBA & FBS 1st",
            Title = "IBA & DU C Unit Analytics Bootcamp",
            Subtitle = "Math Aptitude, Verbal Ability & Essay Frameworks.",
            Image = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
            AccentColor = "#34d399",
            Description = "Comprehensive preparation for IBA DU and business faculty."
        },
        new SpotlightItem
        {
            Id = "sp_06",
            Code = "06",
            Name = "Zane",
            Category = "Faculty of Arts",
            BadgeText = "DU B Unit Top",
            Title = "Arts Faculty & Unit Change Mega Package",
            Subtitle = "Bangla, English & General Knowledge for Varsity Admission.",
            Image = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
            AccentColor = "#f59e0b",
            Description = "Complete language and general knowledge booster course."
        }
    };

    public Task<List<SpotlightItem>> GetSpotlightItemsAsync()
    {
        return Task.FromResult(Spotlights);
    }
}
