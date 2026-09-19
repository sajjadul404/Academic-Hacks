# 🚀 EduPath 3D Circular Carousel (.NET 8 Blazor & ASP.NET Core)

এই প্রজেক্টটিতে **.NET 8 (C#)**, **Blazor Interactive Components**, এবং **ASP.NET Core Web API** দিয়ে হুবহু ৩৬০° 3D সার্কুলার সিলিন্ডার ক্যারোজেল তৈরি করা হয়েছে।

---

## 📂 .NET Project Structure

```
dotnet/EduPath.BlazorApp/
├── Controllers/
│   └── SpotlightController.cs      # ASP.NET Core REST API
├── Models/
│   └── SpotlightItem.cs            # C# Strongly Typed Model
├── Services/
│   └── CourseService.cs            # C# Business Logic & Data Service
├── Components/
│   ├── HeroSpotlight3D.razor       # Blazor 3D Circular Component (C# & HTML)
│   └── HeroSpotlight3D.razor.css   # Scoped CSS for 3D Perspective
├── Program.cs                      # .NET 8 Minimal Hosting Setup
└── EduPath.BlazorApp.csproj        # .NET 8 Project Manifest
```

---

## 🛠️ How to Run in .NET / Visual Studio

### অপশন ১: .NET CLI দিয়ে রান করতে
```bash
cd dotnet/EduPath.BlazorApp
dotnet run
```
এরপর ব্রাউজারে `http://localhost:5000` অথবা `https://localhost:5001` ওপেন করুন।

### অপশন ২: Visual Studio 2022 দিয়ে রান করতে
1. **Visual Studio 2022** ওপেন করুন।
2. `EduPath.BlazorApp.csproj` ফাইলটি খুলুন।
3. **F5** অথবা **Ctrl + F5** প্রেস করে রান করুন।

---

## 🌟 .NET Blazor Features Included:
- **C# Reactive State Engine**: `System.Timers.Timer` এবং `InvokeAsync(StateHasChanged)` দিয়ে মসৃণ ৬০ FPS সার্কুলার রোটেশন।
- **3D CSS Preserve-3D & Perspective**: `translateZ()` এবং `rotateY()` দিয়ে স্ক্রিনশটের মতো বাস্তবসম্মত সিলিন্ডার আর্কে কার্ড সাজানো।
- **RESTful API**: `GET /api/spotlight` এন্ডপয়েন্ট দিয়ে ডাটা ফেচিং।
- **Strongly Typed C# Models**: `SpotlightItem` ক্লাস দিয়ে টাইপ-সেফ আর্কিটেকচার।
