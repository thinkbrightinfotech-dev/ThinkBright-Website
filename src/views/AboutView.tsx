import React from 'react';
import { THINKBRIGHT_INFO } from '../data/mockData';
import { 
  CheckCircle2, 
  Target, 
  Compass, 
  Heart, 
  Award, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  BookOpen,
  GraduationCap
} from 'lucide-react';

interface AboutViewProps {
  setActiveTab: (tab: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setActiveTab }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          About ThinkBright Infotech
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight font-display">
          Bridging the Digital Divide, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            One Life at a Time.
          </span>
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Rooted in Ilora, Oyo State, ThinkBright Infotech is a purpose-driven technology education and digital solutions enterprise built on the belief that geography should never limit technological capability.
        </p>
      </div>

      {/* Founder Spotlight */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950">
              <img 
                src="/images/founder.jpg" 
                alt="Opeyemi Israel Okunade, Founder of ThinkBright Infotech" 
                className="w-full h-96 object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                <p className="text-white font-bold text-sm">Opeyemi Israel Okunade</p>
                <p className="text-cyan-400 text-xs">Founder & Lead Educator</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">The Visionary Behind the Hub</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              "We must not merely train computer users; we must raise digital creators, builders, and problem solvers."
            </h2>
            <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
              <p>
                <strong>Opeyemi Israel Okunade</strong> is a passionate Nigerian educator, technology practitioner, and community advocate who recognized early the immense potential locked inside semi-urban and rural communities across Oyo State and Nigeria.
              </p>
              <p>
                Seeing that millions of young students in communities like Ilora, Fiditi, and surrounding towns had to travel long distances or settle for rudimentary typing centers with obsolete equipment, Okunade established ThinkBright Infotech. His mission was uncompromising: build a modern, high-standard digital ecosystem with uninterrupted power, high-speed connectivity, industry-standard tools, and hands-on mentorship.
              </p>
              <p>
                Under his leadership, ThinkBright has trained over 1,400 students, partnered with 28 primary and secondary schools, empowered dozens of teachers, and helped local MSMEs formalize their commercial presence.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-950 text-cyan-400 flex items-center justify-center border border-cyan-800/40">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Our Mission</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            To democratize world-class technology education, digital solutions, and economic empowerment across Nigeria and Africa — delivering practical, accessible, and high-impact training that translates directly into employment, enterprise, and community transformation.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-950 text-blue-400 flex items-center justify-center border border-blue-800/40">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Our Vision</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            To become Africa's premier grassroots technology catalyst — recognized for raising 100,000+ digitally skilled youth, building software infrastructure for African schools and enterprises, and proving that transformative tech innovation thrives anywhere dedication meets opportunity.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Guiding Principles</span>
          <h2 className="text-3xl font-extrabold text-white font-display">Our Core Values</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold">1</div>
            <h4 className="font-bold text-white text-base">Pragmatic Excellence</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We teach skills that solve real-world challenges. Theory is always paired with hands-on computer execution from day one.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950 text-blue-400 flex items-center justify-center font-bold">2</div>
            <h4 className="font-bold text-white text-base">Radical Inclusion</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              No one is left behind. Whether you are a primary school pupil, an apprentice with no prior computer background, or a market trader, we adapt our pace to you.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold">3</div>
            <h4 className="font-bold text-white text-base">Integrity & Accountability</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transparent pricing, verified attendance, formal apprenticeship agreements, and verifiable digital certificates.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-950 text-indigo-400 flex items-center justify-center font-bold">4</div>
            <h4 className="font-bold text-white text-base">Community Empowerment</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our growth must lift the whole ecosystem. We reinvest in rural outreach, free digital literacy days, and school ICT development.
            </p>
          </div>
        </div>
      </div>

      {/* Physical Training Center Guide */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Visit Our Physical Hub</span>
          </div>
          <h3 className="text-2xl font-bold text-white font-display">
            Behind Musalat Filling Station, Okediji Area, Ilora, Oyo State
          </h3>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Equipped with modern computer workstations, dedicated high-speed internet, solar inverter backup power, and a creative digital printing & cyber solutions floor.
          </p>
          <div className="pt-1 flex flex-wrap gap-4 text-xs text-slate-400">
            <span>📞 09034836379</span>
            <span>📞 09015306791</span>
            <span>✉️ thinkbrightinfotech@gmail.com</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('courses')}
            className="px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>View Courses</span>
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
          >
            <span>Get Directions</span>
          </button>
        </div>
      </div>

    </div>
  );
};
