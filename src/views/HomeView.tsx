import React from 'react';
import { useData } from '../context/DataContext';
import { THINKBRIGHT_INFO } from '../data/mockData';
import { TestimonialSlider } from '../components/TestimonialSlider';
import { 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Layers, 
  ShieldCheck, 
  Users, 
  Building, 
  CheckCircle2, 
  ChevronRight, 
  Laptop, 
  Printer, 
  Cpu, 
  TrendingUp, 
  Star,
  Quote,
  Calendar,
  Globe,
  HeartHandshake,
  Briefcase
} from 'lucide-react';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  onOpenPaymentModal?: (serviceOrProgramme: string, amount: number) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  setActiveTab, 
  onOpenPaymentModal 
}) => {
  const { courses, impactStats, testimonials, projects, blogPosts } = useData();

  const featuredCourses = courses.filter(c => c.featured).slice(0, 4);
  const recentProjects = projects.slice(0, 3);
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-24 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-300 text-xs font-semibold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Modern African Technology Ecosystem • Ilora, Oyo State</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-display">
                Empowering Your <br className="hidden sm:block" />
                <span className="text-cyan-400">
                  Digital Future.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
                Practical technology training, digital solutions and economic opportunities that help people, schools and businesses grow — from our physical hub in Ilora, Oyo State to the continent and the world.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  id="hero-explore-courses-btn"
                  onClick={() => setActiveTab('courses')}
                  className="px-6 py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm flex items-center gap-2.5 shadow-lg shadow-cyan-600/20 transition-all transform hover:-translate-y-0.5"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-become-apprentice-btn"
                  onClick={() => setActiveTab('apprenticeship')}
                  className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-cyan-300 font-bold text-sm flex items-center gap-2.5 border border-cyan-500/30 hover:border-cyan-400 transition-all transform hover:-translate-y-0.5"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Become an Apprentice</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg">
                <div>
                  <p className="text-2xl font-black text-white font-mono">1,400+</p>
                  <p className="text-xs text-slate-400">People Trained</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-cyan-400 font-mono">28</p>
                  <p className="text-xs text-slate-400">Schools Reached</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-blue-400 font-mono">100%</p>
                  <p className="text-xs text-slate-400">Practical & Hands-On</p>
                </div>
              </div>
            </div>

            {/* Hero Right Media */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
                <img 
                  src="/images/hero.jpg" 
                  alt="African youth learning technology and computer coding at ThinkBright Infotech" 
                  className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating overlay card: Verified Learning */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center border border-cyan-800/50 shrink-0">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Ilora ICT Training Hub</p>
                      <p className="text-[11px] text-cyan-300">Daily Hands-on Practical Sessions</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-[10px] border border-emerald-500/30">
                    Open Mon – Sat
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800/80 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Who We Are</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                More Than a Computer Centre. <br />
                A Modern African Technology Movement.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                ThinkBright Infotech was founded by educator and technology professional <strong>Opeyemi Israel Okunade</strong> to bridge the digital divide. We provide practical technology education, professional digital solutions, apprenticeship opportunities, and community empowerment programmes designed to transform learners into skilled professionals and help local enterprises thrive.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Physical training hub in Ilora, Oyo State</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Industry-standard software & design curricula</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Commercial printing, CAC & cyber services</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>ThinkBright Labs software innovation engine</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <button
                onClick={() => setActiveTab('about')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
              >
                <span>Read Our Full Story & Vision</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE DO: LEARN • BUILD • EMPOWER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Our Core Pillars</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            What We Do
          </h2>
          <p className="text-sm text-slate-400">
            A comprehensive ecosystem designed to take individuals, schools, and businesses from initial literacy to digital sovereignty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Learn Card */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950 text-cyan-400 flex items-center justify-center border border-cyan-800/40 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Learn</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Practical digital and technology education: Computer Fundamentals, Office Suites, Coding (Web, Python, Apps), Graphic Design, Video Editing, and JAMB CBT Mastery.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('courses')}
              className="mt-6 text-xs font-bold text-cyan-400 flex items-center gap-1 group-hover:text-cyan-300"
            >
              <span>Explore All Courses</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Build Card */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-950 text-blue-400 flex items-center justify-center border border-blue-800/40 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Build</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Digital solutions, software engineering, branding, high-grade printing, plastic PVC ID cards, and documentation for organizations and schools.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('services')}
              className="mt-6 text-xs font-bold text-blue-400 flex items-center gap-1 group-hover:text-blue-300"
            >
              <span>View Services & Solutions</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Empower Card */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-sky-500/40 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-950 text-sky-400 flex items-center justify-center border border-sky-800/40 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Empower</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Apprenticeship programs, teacher digitalization workshops, rural community outreach, and economic empowerment turning knowledge into income.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('apprenticeship')}
              className="mt-6 text-xs font-bold text-sky-400 flex items-center gap-1 group-hover:text-sky-300"
            >
              <span>Apprenticeship & Impact</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. FEATURED COURSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Curriculum & Academy</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display mt-1">
              Featured Courses
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Practical, job-ready programs taught by patient, experienced instructors at our physical hub.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('courses')}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 hover:border-cyan-500/30 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>View All 13 Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map(course => (
            <div 
              key={course.id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <span className="px-2.5 py-1 text-[10px] font-semibold rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                  {course.category}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {course.tagline}
                </p>
                <div className="pt-2 text-[11px] text-slate-400 space-y-1 border-t border-slate-800">
                  <p>⏳ Duration: <strong className="text-slate-200">{course.duration}</strong></p>
                  <p>🎓 Format: <strong className="text-slate-200">Physical Hands-On</strong></p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Tuition</span>
                  <span className="text-base font-mono font-bold text-white">₦{course.fee.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => setActiveTab('courses')}
                  className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center gap-1 transition-colors"
                >
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MAJOR SERVICES SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Enterprise & Digital Solutions</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Comprehensive Digital Services
          </h2>
          <p className="text-sm text-slate-400">
            From industrial printing and corporate branding to government registrations and tech support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition-all space-y-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center border border-cyan-800/40">
              <Printer className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Printing & Branding</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Typesetting, Photocopying, Flex Banners, Plastic PVC ID Cards, Booklets, Letterheads, and Certificates.
            </p>
            <button onClick={() => setActiveTab('services')} className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
              <span>Explore Printing</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition-all space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-950 text-blue-400 flex items-center justify-center border border-blue-800/40">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Cyber & Online Services</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              JAMB/WAEC/NECO Registrations, Result Checking & Scratch Cards, School Fee Remita, NIN & BVN Slip Reprinting, POS.
            </p>
            <button onClick={() => setActiveTab('services')} className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1">
              <span>Explore Cyber Services</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition-all space-y-4">
            <div className="w-10 h-10 rounded-xl bg-sky-950 text-sky-400 flex items-center justify-center border border-sky-800/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Documentation & CAC</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              CAC Business Registration, Sworn Court Affidavits, Birth Certificate Attestations, State of Origin, TRCN Support.
            </p>
            <button onClick={() => setActiveTab('services')} className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1">
              <span>Explore Documentation</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition-all space-y-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-950 text-indigo-400 flex items-center justify-center border border-indigo-800/40">
              <Laptop className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Sales & Tech Support</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tested UK-used Laptops, SSD & RAM upgrades, Computer Accessories, Academic Project Data Analysis, and Stationery.
            </p>
            <button onClick={() => setActiveTab('services')} className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              <span>Explore Sales & Support</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. APPRENTICESHIP PROGRAMME SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                Flagship Career Pathway
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                The ThinkBright Apprenticeship
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                Transform from a digital beginner into a confident, job-ready practitioner. 
                Our structured apprenticeship combines hands-on mentorship, actual commercial projects, rigorous assessments, an electronic agreement, and a globally verifiable digital certificate.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <p className="font-bold text-white">Structured Agreement</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Formal e-signed rights & curriculum milestones</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <p className="font-bold text-white">Commercial Project Portfolio</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Real client briefs and team collaboration</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <p className="font-bold text-white">Attendance & Assessment Tracking</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Dedicated portal for learners and parents</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <p className="font-bold text-white">Certified Digital Credential</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">QR-verifiable certificate for life</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  id="apprentice-spotlight-apply-btn"
                  onClick={() => setActiveTab('apprenticeship')}
                  className="px-6 py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/30 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Apply Now for Next Cohort</span>
                </button>
                <button
                  onClick={() => setActiveTab('apprenticeship')}
                  className="px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-800 transition-colors"
                >
                  Learn How the Programme Works
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
                <img 
                  src="/images/apprentice.jpg" 
                  alt="ThinkBright apprentices actively learning computer skills" 
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. THINKBRIGHT LABS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
                <Cpu className="w-3.5 h-3.5" />
                <span>R&D and Software Innovation</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">
                ThinkBright Labs
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                We design and incubate proprietary software products solving real African challenges:
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">ThinkBright School OS</p>
                    <p className="text-slate-400 text-[11px]">Automated report cards, attendance & fees for Nigerian schools</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 text-[10px] font-semibold border border-blue-800">Coming Soon</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">ThinkBright CBT Platform</p>
                    <p className="text-slate-400 text-[11px]">Offline-capable exam simulator with authentic 8-key shortcuts</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-900/40 text-emerald-300 text-[10px] font-semibold border border-emerald-800">Beta Testing</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">ThinkBright Business OS</p>
                    <p className="text-slate-400 text-[11px]">Lightweight bookkeeping & inventory management for African MSMEs</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 text-[10px] font-semibold border border-blue-800">Coming Soon</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('labs')}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs flex items-center gap-2 border border-slate-700 transition-colors"
                >
                  <span>Explore ThinkBright Labs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
                <img 
                  src="/images/labs.jpg" 
                  alt="ThinkBright Labs innovation workspace" 
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. SOCIAL IMPACT & LIVE STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Social Impact & Inclusion</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Real Community Impact
          </h2>
          <p className="text-sm text-slate-400">
            Every course, apprentice enrolled, and school supported creates measurable economic outcomes in rural and semi-urban communities.
          </p>
        </div>

        {/* Dynamic Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {impactStats.map(stat => (
            <div 
              key={stat.id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-left hover:border-cyan-500/30 transition-colors"
            >
              <p className="text-3xl sm:text-4xl font-black font-mono text-cyan-400">
                {stat.value.toLocaleString()}{stat.suffix || ''}
              </p>
              <h3 className="text-xs font-bold text-white mt-2 uppercase tracking-wide">
                {stat.label}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Rural inclusion story pill */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-cyan-950/40 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img 
              src="/images/school.jpg" 
              alt="School children receiving ICT education in Nigeria" 
              className="w-20 h-20 rounded-2xl object-cover border border-slate-800 shrink-0"
            />
            <div>
              <h3 className="font-bold text-white text-sm">Rural Digital Inclusion in Oyo State</h3>
              <p className="text-xs text-slate-300 max-w-xl mt-0.5">
                We bring digital literacy directly to schools, teachers, and young people who have never previously touched a computer.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('impact')}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shrink-0 transition-colors"
          >
            Read Our Impact Report
          </button>
        </div>
      </section>

      {/* 9. TESTIMONIALS SLIDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Success Stories & Impact</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Stories of Growth & Transformation
          </h2>
          <p className="text-sm text-slate-400">
            Real stories from our apprentices, schools, and business partners showing the tangible impact of ThinkBright Infotech's programs.
          </p>
        </div>

        <TestimonialSlider 
          testimonials={testimonials} 
          setActiveTab={setActiveTab} 
        />
      </section>

      {/* 10. LATEST PROJECTS & CASE STUDIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Case Studies</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight font-display mt-1">
              Latest Work & Deployments
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('projects')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentProjects.map(proj => (
            <div 
              key={proj.id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                  {proj.category}
                </span>
                <h3 className="font-bold text-base text-white">{proj.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-3">{proj.problem}</p>
                <div className="p-3 rounded-xl bg-slate-950 text-[11px] text-emerald-400 font-medium border border-slate-800">
                  Outcome: {proj.results}
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Client: {proj.client}</span>
                <span>{proj.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. LATEST ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Insights & Resources</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight font-display mt-1">
              Latest from the Blog
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('blog')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map(post => (
            <div 
              key={post.id}
              onClick={() => setActiveTab('blog')}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                  {post.category}
                </span>
                <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                <span>{post.author}</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-10 sm:p-16 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              Ready to Build Your <br />
              <span className="text-cyan-400">Digital Future?</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-200">
              Join hundreds of successful learners, schools, and business partners advancing with practical technology education.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              id="cta-start-learning-bottom"
              onClick={() => setActiveTab('courses')}
              className="px-7 py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-cyan-600/30 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Start Learning</span>
            </button>

            <button
              id="cta-work-with-us-bottom"
              onClick={() => setActiveTab('services')}
              className="px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-cyan-300 font-bold text-sm flex items-center gap-2 border border-cyan-500/40 transition-all"
            >
              <Briefcase className="w-4 h-4" />
              <span>Work With Us (Services)</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
