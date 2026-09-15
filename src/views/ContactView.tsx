import React, { useState } from 'react';
import { THINKBRIGHT_INFO } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { addNotification } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Course Inquiry / Admission');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    addNotification('Message Dispatched', `Thank you ${name}. Your message regarding "${subject}" has been sent to our Ilora desk.`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          Physical Center & Contact
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
          We'd Love to Hear From You
        </h1>
        <p className="text-sm text-slate-300">
          Have inquiries about our courses, apprenticeship admissions, commercial printing, or school software? 
          Reach out directly or visit our center in Ilora.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Info Col */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white font-display">Center Details</h3>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-800/40">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Physical Hub Address</p>
                  <p className="mt-0.5 text-slate-300 leading-relaxed">{THINKBRIGHT_INFO.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-950 text-blue-400 flex items-center justify-center shrink-0 border border-blue-800/40">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Official Hotlines</p>
                  <p className="mt-0.5 font-mono text-cyan-400 font-bold">{THINKBRIGHT_INFO.phones.join(' / ')}</p>
                  <p className="text-[11px] text-slate-400">Available for calls and WhatsApp messages</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-950 text-purple-400 flex items-center justify-center shrink-0 border border-purple-800/40">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Email Inquiries</p>
                  <p className="mt-0.5 text-slate-200 font-medium">{THINKBRIGHT_INFO.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-800/40">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Operating Hours</p>
                  <p className="mt-0.5 text-slate-200">Monday – Saturday: 8:00 AM – 6:30 PM</p>
                  <p className="text-slate-500 text-[11px]">Closed on Sundays</p>
                </div>
              </div>
            </div>
          </div>

          {/* Transportation / Directions Guide */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
            <h4 className="font-bold text-white">How to Locate Us:</h4>
            <p className="text-slate-400 leading-relaxed">
              If arriving from Oyo Town, take the Ilora expressway to Okediji junction. Ask for Musalat Filling Station. Our training hub and commercial building is located directly behind the filling station.
            </p>
          </div>
        </div>

        {/* Contact Form Col */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
            {isSent ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">Message Received</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Thank you for contacting ThinkBright Infotech. Our administrative desk will review your message and respond shortly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 text-white text-xs font-semibold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="text-xl font-bold text-white font-display mb-4">Send a Direct Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Adeola Balogun"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="09034836379"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="adeola@email.com"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">Subject / Inquiry Area *</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Course Inquiry / Admission">Course Inquiry / Admission</option>
                    <option value="Apprenticeship Application">Apprenticeship Application</option>
                    <option value="Commercial Printing & Branding">Commercial Printing & Branding</option>
                    <option value="CAC & Legal Documentation">CAC & Legal Documentation</option>
                    <option value="ThinkBright School OS for Schools">ThinkBright School OS for Schools</option>
                    <option value="General Question / Partnership">General Question / Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you need or how we can assist you..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  id="submit-contact-message-btn"
                  className="w-full py-3.5 px-6 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/30 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to ThinkBright</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
