import React from 'react';
import { useData } from '../context/DataContext';
import { FolderGit2, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

interface ProjectsViewProps {
  setActiveTab: (tab: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ setActiveTab }) => {
  const { projects } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
          Proven Execution & Deployments
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
          Case Studies & Projects
        </h1>
        <p className="text-sm text-slate-300">
          Discover how ThinkBright Infotech transforms schools, agribusinesses, and community enterprises through practical technology solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(p => (
          <div key={p.id} className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {p.category}
                </span>
                <span className="text-[11px] text-slate-500">{p.date}</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-display">{p.title}</h3>
                <p className="text-xs text-cyan-400 font-medium mt-0.5">Client: {p.client}</p>
              </div>

              <div className="space-y-3 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <div>
                  <p className="font-bold text-slate-400 text-[11px] uppercase tracking-wide">Challenge / Problem:</p>
                  <p className="mt-0.5 leading-relaxed">{p.problem}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 text-[11px] uppercase tracking-wide">ThinkBright Solution:</p>
                  <p className="mt-0.5 leading-relaxed">{p.solution}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/30 text-emerald-300 text-xs font-medium space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">Results Achieved:</span>
                <p>{p.results}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-1.5">
              {p.technologies.map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-cyan-950/40 border border-slate-800 text-center space-y-4">
        <h3 className="text-xl font-bold text-white font-display">Have a Project or Enterprise Need?</h3>
        <p className="text-xs text-slate-300 max-w-xl mx-auto">
          From full computer laboratory setup to customized business software and commercial printing, our team delivers with unmatched quality.
        </p>
        <button
          onClick={() => setActiveTab('services')}
          className="px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs inline-flex items-center gap-2"
        >
          <span>Discuss Your Project With Us</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
