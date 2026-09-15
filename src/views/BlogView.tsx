import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { BlogPost } from '../types';
import { Newspaper, Search, Clock, User, ArrowRight, X, BookOpen } from 'lucide-react';

export const BlogView: React.FC = () => {
  const { blogPosts } = useData();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);

  const categories = ['All', 'Exam Tips', 'EdTech', 'Career Advice', 'Digital Skills', 'Business Tech'];

  const filtered = blogPosts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Newspaper className="w-3.5 h-3.5 text-cyan-400" />
          Knowledge Hub & Insights
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
          ThinkBright Blog & Resources
        </h1>
        <p className="text-sm text-slate-300">
          Practical advice on JAMB CBT preparation, technology careers in Nigeria, school digitalization, and small business productivity.
        </p>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles and topics..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-cyan-600 text-white font-bold'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(post => (
          <div 
            key={post.id}
            onClick={() => setReadingPost(post)}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between cursor-pointer group shadow-lg"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {post.category}
                </span>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 pt-2">
                {post.tags.map((t, i) => (
                  <span key={i} className="text-[10px] text-slate-500 bg-slate-950 px-2 py-0.5 rounded">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium text-[11px]">{post.author}</span>
              <span className="text-cyan-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Reading Article Modal */}
      {readingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 text-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto my-8">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4 gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {readingPost.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display mt-2">
                  {readingPost.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                  <span>By {readingPost.author}</span>
                  <span>•</span>
                  <span>{readingPost.publishedAt}</span>
                  <span>•</span>
                  <span>{readingPost.readTime}</span>
                </div>
              </div>
              <button 
                onClick={() => setReadingPost(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs sm:text-sm text-slate-300 space-y-4 leading-relaxed font-sans">
              <p className="font-medium text-slate-200 text-base">{readingPost.summary}</p>
              <p>
                At ThinkBright Infotech, we frequently observe that many students and professionals have immense talent, but encounter friction simply due to unfamiliarity with modern computer toolsets. In our physical training center Behind Musalat Filling Station, Okediji Area, Ilora, we address this directly through hands-on practice.
              </p>
              <p>
                Whether you are aiming to ace your next computer-based examination, transition into a remote software development career, or formalize your business through digital branding and CAC registration, practical step-by-step repetition is the golden rule.
              </p>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <p className="font-bold text-cyan-400 text-xs">ThinkBright Takeaway Checklist:</p>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                  <li>Start with foundational computer keyboard shortcuts and file organisation.</li>
                  <li>Practice with real simulation environments before test or deadline days.</li>
                  <li>Seek mentorship and structured evaluation rather than unguided video scrolling.</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setReadingPost(null)}
                className="px-5 py-2 rounded-xl bg-cyan-600 text-white text-xs font-semibold"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
