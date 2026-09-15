import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  CheckCircle2, 
  GraduationCap, 
  Building2, 
  Sparkles, 
  MapPin, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { TestimonialItem } from '../types';

interface TestimonialSliderProps {
  testimonials: TestimonialItem[];
  setActiveTab?: (tab: string) => void;
}

type FilterCategory = 'all' | 'student' | 'partner';

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ 
  testimonials,
  setActiveTab 
}) => {
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Filter items based on category
  const filteredStories = testimonials.filter(item => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  // Keep index within bounds if filtered list changes
  const activeIndex = Math.min(currentIndex, Math.max(0, filteredStories.length - 1));
  const currentStory = filteredStories[activeIndex];

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying || isHovered || filteredStories.length <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex(prev => (prev + 1) % filteredStories.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, filteredStories.length]);

  const handleNext = () => {
    if (filteredStories.length <= 1) return;
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % filteredStories.length);
  };

  const handlePrev = () => {
    if (filteredStories.length <= 1) return;
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + filteredStories.length) % filteredStories.length);
  };

  const handleSelect = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  if (!filteredStories.length || !currentStory) {
    return (
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center text-slate-400">
        No stories found for this category.
      </div>
    );
  }

  // Counts for pills
  const studentCount = testimonials.filter(t => t.category === 'student').length;
  const partnerCount = testimonials.filter(t => t.category === 'partner').length;

  const isStudent = currentStory.category === 'student';

  // Animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 }
      }
    })
  };

  return (
    <div 
      id="testimonial-slider-container"
      ref={sliderRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Student and Partner Success Stories"
      className="space-y-6 focus:outline-none"
    >
      {/* Top Filter & Control Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        {/* Category Tabs */}
        <div className="inline-flex p-1 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner">
          <button
            id="testimonial-filter-all"
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filter === 'all'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-900/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>All Stories</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950/60 font-mono">
              {testimonials.length}
            </span>
          </button>

          <button
            id="testimonial-filter-student"
            onClick={() => setFilter('student')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filter === 'student'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-900/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-cyan-300" />
            <span>Students & Apprentices</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950/60 font-mono">
              {studentCount}
            </span>
          </button>

          <button
            id="testimonial-filter-partner"
            onClick={() => setFilter('partner')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filter === 'partner'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-900/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-blue-300" />
            <span>Partners & Schools</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950/60 font-mono">
              {partnerCount}
            </span>
          </button>
        </div>

        {/* Carousel Navigation Buttons & Counter */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Auto-play toggle */}
          <button
            id="testimonial-autoplay-toggle"
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause auto-sliding' : 'Start auto-sliding'}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-slate-700 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Slide Indicator */}
          <div className="text-xs font-mono text-slate-400 px-2">
            <span className="text-white font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className="text-slate-600 mx-1">/</span>
            <span>{String(filteredStories.length).padStart(2, '0')}</span>
          </div>

          {/* Prev / Next controls */}
          <div className="flex items-center gap-1.5">
            <button
              id="testimonial-prev-btn"
              onClick={handlePrev}
              disabled={filteredStories.length <= 1}
              aria-label="Previous story"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-cyan-500/40 disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="testimonial-next-btn"
              onClick={handleNext}
              disabled={filteredStories.length <= 1}
              aria-label="Next story"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-cyan-500/40 disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Spotlight Card Container */}
      <div className="relative min-h-[360px] sm:min-h-[320px] rounded-3xl bg-slate-900 border border-slate-800 shadow-xl p-6 sm:p-10 overflow-hidden">
        
        {/* Large Watermark Quote Icon */}
        <Quote className="absolute top-6 right-8 w-24 h-24 text-slate-800/30 rotate-12 pointer-events-none" />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStory.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Story Content Left */}
            <div className="lg:col-span-8 space-y-5">
              
              {/* Badges & Rating Header */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${
                  isStudent 
                    ? 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60' 
                    : 'bg-blue-950/80 text-blue-300 border-blue-800/60'
                }`}>
                  {isStudent ? (
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                  ) : (
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                  )}
                  <span>{isStudent ? 'Apprentice / Student Story' : 'Partner & Enterprise Story'}</span>
                </span>

                {currentStory.badge && (
                  <span className="px-2.5 py-1 rounded-full bg-slate-800/90 text-slate-300 text-[11px] font-medium border border-slate-700/60 flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-400" />
                    <span>{currentStory.badge}</span>
                  </span>
                )}

                <div className="flex items-center gap-1 text-amber-400 ml-auto sm:ml-0 bg-slate-950/60 px-2.5 py-1 rounded-full border border-slate-800/80">
                  {[...Array(currentStory.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-[11px] font-mono font-bold text-amber-300 ml-1">5.0</span>
                </div>
              </div>

              {/* Quote Body */}
              <blockquote className="text-base sm:text-lg lg:text-xl font-medium text-slate-100 leading-relaxed font-sans">
                "{currentStory.quote}"
              </blockquote>

              {/* Impact Highlight Callout Banner */}
              {currentStory.impactHighlight && (
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/90 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-cyan-950/90 border border-cyan-800/60 text-cyan-400 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Key Impact Outcome</p>
                    <p className="text-xs sm:text-sm font-semibold text-white truncate sm:text-clip">
                      {currentStory.impactHighlight}
                    </p>
                  </div>
                </div>
              )}

              {/* Author & Location Footer */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                {/* Avatar / Monogram */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-cyan-950/50 shrink-0 border border-cyan-400/30">
                  {currentStory.name
                    .split(' ')
                    .map(n => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-sm sm:text-base text-white">{currentStory.name}</p>
                    {currentStory.verified !== false && (
                      <span title="Verified Story">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-cyan-300 font-medium">
                    {currentStory.role}
                    {currentStory.organizationOrSchool && ` • ${currentStory.organizationOrSchool}`}
                  </p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{currentStory.location}</span>
                  </p>
                </div>
              </div>

            </div>

            {/* Impact Metric & Quick Action Card Right */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4 lg:border-l lg:border-slate-800/80 lg:pl-8">
              
              {/* Primary Stat Card */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block">
                  Measured Program Metric
                </span>
                <p className="text-2xl sm:text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  {currentStory.metric || '100% Practical'}
                </p>
                <div className="pt-1 border-t border-slate-800/80">
                  <p className="text-[11px] text-slate-400">
                    Associated Track:
                  </p>
                  <p className="text-xs font-semibold text-slate-200 mt-0.5">
                    {currentStory.programmeOrService}
                  </p>
                </div>
              </div>

              {/* Dynamic Action Trigger */}
              <div className="space-y-2 pt-1">
                {isStudent ? (
                  <button
                    id="testimonial-apply-apprentice-btn"
                    onClick={() => setActiveTab && setActiveTab('apprenticeship')}
                    className="w-full py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40 transition-colors"
                  >
                    <span>Become an Apprentice</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    id="testimonial-partner-btn"
                    onClick={() => setActiveTab && setActiveTab('contact')}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-950/40 transition-colors"
                  >
                    <span>Partner With ThinkBright</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  id="testimonial-explore-courses-btn"
                  onClick={() => setActiveTab && setActiveTab('courses')}
                  className="w-full py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 border border-slate-800 transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>Explore All Training Tracks</span>
                </button>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Auto-Play Progress Bar Indicator at bottom */}
        {isPlaying && !isHovered && filteredStories.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-900">
            <motion.div
              key={`${currentStory.id}-timer`}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 6.5, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
            />
          </div>
        )}
      </div>

      {/* Story Thumbnails Rail (allows jumping to any story directly) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-400">
            Quick Story Navigation ({filteredStories.length})
          </span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Click any story card to preview
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {filteredStories.map((story, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={story.id}
                id={`testimonial-thumb-${story.id}`}
                onClick={() => handleSelect(idx)}
                aria-label={`Jump to ${story.name}'s testimonial`}
                className={`text-left p-3 rounded-2xl border transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'bg-slate-800/95 border-cyan-500/80 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/40'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400" />
                )}
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                    story.category === 'student'
                      ? 'bg-cyan-950/80 text-cyan-300'
                      : 'bg-blue-950/80 text-blue-300'
                  }`}>
                    {story.category === 'student' ? 'Student' : 'Partner'}
                  </span>
                  {story.metric && (
                    <span className="text-[10px] font-mono font-bold text-cyan-400 truncate max-w-[80px]">
                      {story.metric}
                    </span>
                  )}
                </div>
                <p className="text-xs font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                  {story.name}
                </p>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  {story.role}
                </p>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
