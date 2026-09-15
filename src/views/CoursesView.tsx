import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Course } from '../types';
import { 
  Search, 
  Filter, 
  Clock, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  BookOpen, 
  Laptop, 
  X, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface CoursesViewProps {
  selectedCourseId?: string;
  onOpenPaymentModal: (courseTitle: string, fee: number) => void;
  setActiveTab: (tab: string) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ 
  selectedCourseId, 
  onOpenPaymentModal, 
  setActiveTab 
}) => {
  const { courses } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeModalCourse, setActiveModalCourse] = useState<Course | null>(() => {
    if (selectedCourseId) {
      return courses.find(c => c.id === selectedCourseId) || null;
    }
    return null;
  });

  const categories = [
    'All',
    'Foundations',
    'Coding & Software',
    'Design & Creative',
    'Data & Analytics',
    'Specialist',
    'Teachers & Schools',
    'Business & MSMEs'
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.syllabus.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          Practical ICT Academy
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
          Technology Courses Built for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Real Career & Business Impact
          </span>
        </h1>
        <p className="text-sm text-slate-300">
          Learn directly at our equipped training hub Behind Musalat Filling Station, Okediji Area, Ilora. 
          Zero fluff, 100% hands-on workstations, patient mentorship, and verified certificate upon completion.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="course-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, skills, tools..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-600 text-white font-bold shadow-lg shadow-cyan-600/30'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div 
            key={course.id}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-[10px] font-semibold rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                  {course.category}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {course.duration}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {course.tagline}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 space-y-2 text-xs">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Key Syllabus Modules:</p>
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  {course.syllabus.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                  {course.syllabus.length > 3 && (
                    <li className="text-slate-500 text-[10px] pl-4.5">
                      + {course.syllabus.length - 3} more modules in syllabus
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Tuition Fee</span>
                <span className="text-lg font-mono font-bold text-white">
                  ₦{course.fee.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id={`course-view-${course.id}`}
                  onClick={() => setActiveModalCourse(course)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
                >
                  Syllabus
                </button>
                <button
                  id={`course-enroll-${course.id}`}
                  onClick={() => onOpenPaymentModal(`${course.title} Course Tuition`, course.fee)}
                  className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-cyan-600/30 transition-all"
                >
                  <span>Enroll</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-16 bg-slate-900/60 rounded-3xl border border-slate-800 text-slate-400 text-xs">
          <p className="text-base font-semibold text-white">No courses match your search.</p>
          <p className="mt-1">Try clearing your filters or search keywords.</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
            className="mt-4 px-4 py-2 rounded-xl bg-cyan-600 text-white font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Apprenticeship vs Standalone Notice */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white font-display">Looking for Long-Term Mastery?</h3>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            In addition to standalone modular courses, ThinkBright offers our <strong>Comprehensive Apprenticeship Programme</strong> — combining multi-track courses, commercial project execution, structured attendance, an e-signed learning agreement, and job placement assistance.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('apprenticeship')}
          className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs border border-cyan-500/30 shrink-0 transition-colors"
        >
          View Apprenticeship Pathway
        </button>
      </div>

      {/* Detailed Course Syllabus Modal */}
      {activeModalCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 bg-slate-950/60 flex items-start justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {activeModalCourse.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-display mt-2">
                  {activeModalCourse.title}
                </h3>
                <p className="text-xs text-cyan-400 mt-0.5">{activeModalCourse.tagline}</p>
              </div>
              <button
                id="close-syllabus-modal"
                onClick={() => setActiveModalCourse(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-xs">
              {/* Quick Info Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Duration</span>
                  <span className="font-bold text-white text-xs">{activeModalCourse.duration}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Tuition Fee</span>
                  <span className="font-mono font-bold text-cyan-400 text-xs">₦{activeModalCourse.fee.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Target Level</span>
                  <span className="font-bold text-white text-xs">{activeModalCourse.level}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Prerequisites</span>
                  <span className="font-bold text-white text-[11px] truncate">{activeModalCourse.prerequisites}</span>
                </div>
              </div>

              {/* Complete Curriculum Syllabus */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>Curriculum & Learning Modules</span>
                </h4>
                <div className="divide-y divide-slate-800/60 border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/40">
                  {activeModalCourse.syllabus.map((item, idx) => (
                    <div key={idx} className="p-3.5 flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-300 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 border border-cyan-800/40">
                        {idx + 1}
                      </span>
                      <p className="text-slate-200 text-xs font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Outcome & Certificate */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-800/40 text-slate-300 space-y-1.5">
                <p className="font-bold text-white text-xs flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-cyan-400" />
                  Certification & Post-Course Benefits:
                </p>
                <p className="text-[11px] leading-relaxed">
                  Upon passing final practical project evaluations, students receive a secure, QR-coded ThinkBright Digital Certificate, globally verifiable on thinkbrightinfotech.com.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Total Tuition</span>
                <span className="text-xl font-mono font-black text-white">
                  ₦{activeModalCourse.fee.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveModalCourse(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Close
                </button>
                <button
                  id="modal-enroll-and-pay"
                  onClick={() => {
                    const course = activeModalCourse;
                    setActiveModalCourse(null);
                    onOpenPaymentModal(`${course.title} Tuition`, course.fee);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/30 flex items-center gap-1.5"
                >
                  <span>Enroll & Pay (Moniepoint / Bank)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
