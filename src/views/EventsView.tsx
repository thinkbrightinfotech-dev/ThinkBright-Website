import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Calendar, MapPin, Clock, Users, CheckCircle, Sparkles, ArrowRight, X } from 'lucide-react';

export const EventsView: React.FC = () => {
  const { events } = useData();
  const { addNotification } = useAuth();
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleRegister = (eventId: string, title: string) => {
    if (registeredEvents.includes(eventId)) return;
    setRegisteredEvents(prev => [...prev, eventId]);
    addNotification('Event Registration Confirmed', `You have successfully reserved your seat for "${title}". We look forward to welcoming you at our Ilora Hub.`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          Community Workshops & Bootcamps
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
          Events & Masterclasses
        </h1>
        <p className="text-sm text-slate-300">
          Join hands-on physical bootcamps, teacher digitalization seminars, and free community tech literacy clinics at ThinkBright Hub, Ilora.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map(evt => {
          const isReg = registeredEvents.includes(evt.id);
          return (
            <div 
              key={evt.id}
              className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-xl space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                    {evt.targetAudience}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {evt.fee}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white font-display leading-snug">
                  {evt.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {evt.description}
                </p>

                <div className="pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Date: <strong className="text-slate-200">{evt.date}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Time: <strong className="text-slate-200">{evt.time}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Venue: <strong className="text-slate-200">{evt.venue}</strong></span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Capacity: {evt.capacity} Participants
                </span>
                <button
                  onClick={() => handleRegister(evt.id, evt.title)}
                  disabled={isReg}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isReg 
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 cursor-default'
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/30'
                  }`}
                >
                  {isReg ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Seat Reserved!</span>
                    </>
                  ) : (
                    <>
                      <span>Reserve Seat Free</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
