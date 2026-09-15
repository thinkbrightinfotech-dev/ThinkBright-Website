import React from 'react';
import { THINKBRIGHT_INFO } from '../data/mockData';
import { ShieldCheck, Mail, Phone, MapPin, ArrowUpRight, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/images/logo.png" 
                alt="ThinkBright Infotech" 
                className="w-12 h-12 object-contain rounded-xl bg-slate-900 p-1 border border-cyan-500/30"
              />
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white font-display">
                  Think<span className="text-cyan-400">Bright</span> Infotech
                </span>
                <p className="text-xs text-cyan-400 font-medium">{THINKBRIGHT_INFO.tagline}</p>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              A Nigerian technology education, digital solutions and community empowerment ecosystem. 
              Bridging the digital divide from Ilora and Oyo State to Africa and global technology frontiers.
            </p>
            <div className="pt-2 text-slate-400 space-y-1.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{THINKBRIGHT_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{THINKBRIGHT_INFO.phones.join(' / ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{THINKBRIGHT_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Public Portals */}
          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-xs text-white font-display">Education & Training</p>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => setActiveTab('courses')} className="hover:text-cyan-300 transition-colors">
                  Course Catalogue
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('apprenticeship')} className="hover:text-cyan-300 transition-colors">
                  Apprenticeship Programme
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('courses')} className="hover:text-cyan-300 transition-colors">
                  JAMB CBT Preparation
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('courses')} className="hover:text-cyan-300 transition-colors">
                  ICT for Teachers & Schools
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('courses')} className="hover:text-cyan-300 transition-colors">
                  Digital Skills for MSMEs
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('verify')} className="hover:text-cyan-300 transition-colors flex items-center gap-1 text-cyan-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verify Digital Certificate</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Commercial */}
          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-xs text-white font-display">Services & Solutions</p>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-cyan-300 transition-colors">
                  Printing & Commercial Branding
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-cyan-300 transition-colors">
                  Plastic PVC ID Cards
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-cyan-300 transition-colors">
                  Online Exam Registration (JAMB/WAEC)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-cyan-300 transition-colors">
                  CAC Business Registration
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-cyan-300 transition-colors">
                  Court Affidavits & Documentation
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-cyan-300 transition-colors">
                  Laptops & Computer Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Innovation & Impact */}
          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-xs text-white font-display">Innovation & Impact</p>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => setActiveTab('labs')} className="hover:text-cyan-300 transition-colors flex items-center gap-1">
                  <span>ThinkBright Labs</span>
                  <span className="px-1.5 py-0.2 bg-cyan-900/60 text-cyan-300 rounded text-[9px]">Beta</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('impact')} className="hover:text-cyan-300 transition-colors">
                  Rural Digital Inclusion
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('projects')} className="hover:text-cyan-300 transition-colors">
                  Case Studies & Projects
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('blog')} className="hover:text-cyan-300 transition-colors">
                  Articles & Insights
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('events')} className="hover:text-cyan-300 transition-colors">
                  Community Literacy Days
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-cyan-300 transition-colors">
                  Founder & Our Mission
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} ThinkBright Infotech Enterprises. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="hidden sm:inline text-cyan-400">African Roots, Global Standards</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-400">Okediji Area, Ilora, Oyo State, Nigeria</span>
            <span className="text-slate-700">|</span>
            <span className="font-mono text-cyan-400">{THINKBRIGHT_INFO.domain}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
