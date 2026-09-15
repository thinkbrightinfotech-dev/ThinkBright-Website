import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  GraduationCap, 
  Laptop, 
  Users, 
  ArrowRight, 
  Calendar,
  AlertCircle,
  HelpCircle,
  Clock
} from 'lucide-react';

interface ApprenticeshipViewProps {
  setActiveTab: (tab: string) => void;
}

export const ApprenticeshipView: React.FC<ApprenticeshipViewProps> = ({ setActiveTab }) => {
  const { submitApplication } = useData();
  const { currentUser, addNotification } = useAuth();

  const [fullName, setFullName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [whatsapp, setWhatsapp] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('Oyo State');
  const [education, setEducation] = useState('SSCE / Secondary School');
  const [previousIctExperience, setPreviousIctExperience] = useState('');
  const [programme, setProgramme] = useState('Modern Web Development (HTML, CSS, JavaScript, React)');
  const [preferredStartDate, setPreferredStartDate] = useState('2026-05-01');
  const [statementOfPurpose, setStatementOfPurpose] = useState('');
  
  // Emergency contact
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [emergencyRel, setEmergencyRel] = useState('Parent / Guardian');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);
  const [showAgreementModal, setShowAgreementModal] = useState(false);

  const tracks = [
    'Modern Web Development (HTML, CSS, JavaScript, React)',
    'Graphic Design & Visual Brand Communication (CorelDraw, Photoshop)',
    'Python Programming & Practical Automation',
    'Computer Hardware Engineering & System Maintenance',
    'Digital Office Administration & Executive Secretariat Practice'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const appId = await submitApplication({
        userId: currentUser?.uid || `guest-app-${Date.now()}`,
        fullName,
        email,
        phone,
        whatsapp: whatsapp || phone,
        dob,
        gender,
        address,
        state,
        education,
        previousIctExperience,
        programme,
        preferredStartDate,
        statementOfPurpose,
        emergencyContact: {
          name: emergencyName || 'Emergency Contact',
          phone: emergencyPhone || phone,
          relationship: emergencyRel
        },
        parentGuardian: {
          name: emergencyName || 'Parent / Guardian',
          phone: emergencyPhone || phone,
          email: ''
        }
      });

      setSubmittedAppId(appId);
      addNotification('Apprenticeship Application Submitted', `Your application ${appId} for ${programme} was received. Admissions committee will review within 48 hours.`, 'info');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Flagship Career Pathway
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
          ThinkBright Apprenticeship <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Learn By Doing. Master the Craft.
          </span>
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Not just classroom lectures. You will work on real client branding briefs, computer diagnostics, software builds, and commercial printing orders right here in Ilora under expert mentorship.
        </p>
      </div>

      {/* 4 Steps of Apprenticeship */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 font-bold flex items-center justify-center font-mono">
            01
          </div>
          <h3 className="font-bold text-white text-base">Application & Review</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Submit your application form and brief interview. We evaluate your dedication, readiness, and career aspirations.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-950 text-blue-400 font-bold flex items-center justify-center font-mono">
            02
          </div>
          <h3 className="font-bold text-white text-base">Electronic Agreement</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Formal learning contract e-signed with your parent/guardian defining rights, timetable, safety, and milestone expectations.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center font-mono">
            03
          </div>
          <h3 className="font-bold text-white text-base">Commercial Rotations</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Daily intensive workstations: coding labs, client printing orders, cyber operations, and live customer troubleshooting.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-950 text-purple-400 font-bold flex items-center justify-center font-mono">
            04
          </div>
          <h3 className="font-bold text-white text-base">Certification & Placement</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Verifiable digital certificate, capstone project exhibition, and job/freelance referral support for verified alumni.
          </p>
        </div>
      </div>

      {/* Main Application Form Container */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        {submittedAppId ? (
          <div className="max-w-xl mx-auto text-center space-y-5 py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white font-display">
              Application Received Successfully!
            </h2>
            <p className="text-sm text-slate-300">
              Your ThinkBright Apprenticeship admission dossier has been registered with reference ID:
            </p>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-cyan-400 font-bold text-xl">
              {submittedAppId}
            </div>
            <div className="p-4 rounded-xl bg-slate-950 text-left text-xs text-slate-300 space-y-2 border border-slate-800">
              <p className="font-bold text-white">What Happens Next?</p>
              <p>1. Our admissions officer will review your statement and contact you via phone / WhatsApp.</p>
              <p>2. You will be scheduled for a 20-minute physical orientation interview at our Ilora hub.</p>
              <p>3. Once approved, you will sign the electronic apprenticeship contract and receive your admission number.</p>
            </div>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => setSubmittedAppId(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Submit Another Application
              </button>
              <button
                onClick={() => setActiveTab('portal')}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold"
              >
                Open Learner Portal
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white font-display">
                  Official Apprenticeship Application Form
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Please provide accurate information. Admission is strictly based on dedication and interview evaluation.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAgreementModal(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-slate-800 text-xs flex items-center gap-1.5 self-start sm:self-auto"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Preview Apprenticeship Agreement</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 text-xs">
              
              {/* SECTION 1: Personal Details */}
              <div className="space-y-4">
                <p className="font-bold text-sm text-cyan-400 uppercase tracking-wider">
                  1. Candidate Personal Information
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Full Name (First, Middle, Surname) *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Samuel Olawale Adebayo"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="samuel.adebayo@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Active Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="08134567890"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1">WhatsApp Number</label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="08134567890"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Date of Birth *</label>
                    <input
                      type="date"
                      required
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Gender *</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-medium text-slate-300 mb-1">Residential Address *</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Okediji Area / Isale Oyo Road, Ilora"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1">State of Residence *</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Emergency Contact & Parent Details */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <p className="font-bold text-sm text-cyan-400 uppercase tracking-wider">
                  2. Parent / Guardian / Emergency Contact
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Contact Full Name *</label>
                    <input
                      type="text"
                      required
                      value={emergencyName}
                      onChange={(e) => setEmergencyName(e.target.value)}
                      placeholder="Chief Michael Adebayo"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Contact Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={emergencyPhone}
                      onChange={(e) => setEmergencyPhone(e.target.value)}
                      placeholder="08033344455"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Relationship to Candidate *</label>
                    <input
                      type="text"
                      required
                      value={emergencyRel}
                      onChange={(e) => setEmergencyRel(e.target.value)}
                      placeholder="Father / Mother / Guardian / Brother"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: Academic Background & Programme Selection */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <p className="font-bold text-sm text-cyan-400 uppercase tracking-wider">
                  3. Academic Background & Apprenticeship Track
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Highest Educational Level *</label>
                    <input
                      type="text"
                      required
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      placeholder="e.g. SSCE, OND, NCE, HND, BSc, or in-view"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Desired Apprenticeship Track *</label>
                    <select
                      value={programme}
                      onChange={(e) => setProgramme(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    >
                      {tracks.map((t, idx) => (
                        <option key={idx} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Previous ICT Experience (if any)</label>
                    <input
                      type="text"
                      value={previousIctExperience}
                      onChange={(e) => setPreviousIctExperience(e.target.value)}
                      placeholder="e.g. Basic typing, smartphone navigation, none"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Preferred Commencement Date *</label>
                    <input
                      type="date"
                      required
                      value={preferredStartDate}
                      onChange={(e) => setPreferredStartDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-medium text-slate-300 mb-1">
                      Statement of Purpose / Why do you want to join ThinkBright? *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={statementOfPurpose}
                      onChange={(e) => setStatementOfPurpose(e.target.value)}
                      placeholder="Describe your ambition, what digital skills you want to master, and how this will transform your career or community..."
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA button */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Your application is recorded on ThinkBright Cloud Firestore safely.</span>
                </div>

                <button
                  type="submit"
                  id="submit-apprenticeship-app-btn"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-cyan-600/30 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Official Apprenticeship Application'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        )}
      </div>

      {/* Apprenticeship Agreement Preview Modal */}
      {showAgreementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 text-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-base">ThinkBright Apprenticeship Agreement (Sample v1.2)</h3>
              </div>
              <button 
                onClick={() => setShowAgreementModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 bg-slate-800 rounded-lg"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed font-sans">
              <p className="font-bold text-white">1. PARTIES & JURISDICTION</p>
              <p>
                This agreement is established between ThinkBright Infotech Enterprises (the "Trainer"), operating at Behind Musalat Filling Station, Okediji Area, Ilora, Oyo State, Nigeria, and the Enrolled Apprentice / Guardian.
              </p>

              <p className="font-bold text-white">2. CODE OF CONDUCT & ATTENDANCE</p>
              <p>
                The apprentice commits to a minimum of 85% attendance on scheduled practical sessions. Lateness exceeding 15 minutes is recorded. Respect for workstation hardware, safety protocols, and peers is mandatory.
              </p>

              <p className="font-bold text-white">3. COMMERCIAL PROJECTS & INTELLECTUAL PROPERTY</p>
              <p>
                Apprentices will participate in live commercial projects (client branding, websites, printing). Code and design assets created for external clients remain the client's property, while apprentices retain the right to showcase their contributions in their personal portfolios.
              </p>

              <p className="font-bold text-white">4. CERTIFICATION REQUIREMENTS</p>
              <p>
                Graduation and issuance of the certified ThinkBright Digital Credential requires completion of all core modules, passing score on capstone assessment, and clearance of all tuition dues.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowAgreementModal(false)}
                className="px-5 py-2 rounded-xl bg-cyan-600 text-white text-xs font-semibold"
              >
                Understood & Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
