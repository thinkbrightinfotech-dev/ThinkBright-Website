import React from 'react';
import { useData } from '../context/DataContext';
import { HeartHandshake, TrendingUp, Users, GraduationCap, School, CheckCircle2, ArrowRight } from 'lucide-react';

interface ImpactViewProps {
  setActiveTab: (tab: string) => void;
}

export const ImpactView: React.FC<ImpactViewProps> = ({ setActiveTab }) => {
  const { impactStats } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <HeartHandshake className="w-3.5 h-3.5 text-cyan-400" />
          Social Responsibility & Community
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
          Bridging the Rural Digital Divide <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Across Oyo State, Nigeria
          </span>
        </h1>
        <p className="text-sm text-slate-300">
          We believe technology education is the ultimate economic equalizer. Here is how our work touches lives, families, and grassroots schools every single day.
        </p>
      </div>

      {/* Stats Counter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {impactStats.map(stat => (
          <div key={stat.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-4xl font-black font-mono text-cyan-400 block">
              {stat.value.toLocaleString()}{stat.suffix}
            </span>
            <p className="text-xs font-bold text-white uppercase tracking-wider">{stat.label}</p>
            <p className="text-[11px] text-slate-400 leading-normal">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* 3 Impact Initiatives */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-950 text-cyan-400 flex items-center justify-center border border-cyan-800/40">
            <School className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">School ICT Partnerships</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Many private and community secondary schools lack dedicated computer labs. ThinkBright provides scheduled laboratory sessions, JAMB CBT mock drills, and curriculum advisory directly at our hub or on-site.
          </p>
          <div className="p-3 bg-slate-950 rounded-xl text-cyan-300 text-[11px] font-semibold border border-slate-800">
            28 Schools across Ilora, Oyo, and Fiditi currently supported.
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-950 text-blue-400 flex items-center justify-center border border-blue-800/40">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Teacher Digital Empowerment</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            A school cannot modernize if its educators are digitally excluded. We conduct intensive weekend and holiday workshops teaching teachers digital grading, slide presentations, and internet educational research.
          </p>
          <div className="p-3 bg-slate-950 rounded-xl text-blue-300 text-[11px] font-semibold border border-slate-800">
            180+ Educators certified across primary & secondary levels.
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-800/40">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Youth & Women in Tech</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            We actively support female tech participation through subsidised training tracks and flexible weekend cohorts, empowering young women in graphic design, digital marketing, and software coding.
          </p>
          <div className="p-3 bg-slate-950 rounded-xl text-emerald-300 text-[11px] font-semibold border border-slate-800">
            42% of our active tech apprentices are young women.
          </div>
        </div>

      </div>

      {/* Visual Photo Section */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-2xl font-bold text-white font-display">
            The Community Tech Literacy Day
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Quarterly, ThinkBright opens its physical doors to the general public for free digital literacy workshops. 
            Market traders learn how to send WhatsApp invoices, secondary school leavers test their readiness for computer-based exams, and parents learn about digital safety for their children.
          </p>
          <button
            onClick={() => setActiveTab('events')}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs inline-flex items-center gap-2"
          >
            <span>View Upcoming Community Events</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="lg:col-span-6">
          <img 
            src="/images/school.jpg" 
            alt="ThinkBright Community Training in Oyo State" 
            className="rounded-2xl border border-slate-800 w-full h-72 object-cover"
          />
        </div>
      </div>

    </div>
  );
};
