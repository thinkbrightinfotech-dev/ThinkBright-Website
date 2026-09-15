import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { CertificateRecord } from '../types';
import { THINKBRIGHT_INFO } from '../data/mockData';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Printer, 
  Calendar, 
  User, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const VerificationView: React.FC = () => {
  const { certificates, verifyCertificate } = useData();
  const [certInput, setCertInput] = useState('');
  const [searchedRecord, setSearchedRecord] = useState<CertificateRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certInput.trim()) return;
    const result = verifyCertificate(certInput);
    setSearchedRecord(result || null);
    setHasSearched(true);
  };

  const loadSampleCert = (sampleId: string) => {
    setCertInput(sampleId);
    const result = verifyCertificate(sampleId);
    setSearchedRecord(result || null);
    setHasSearched(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          Official Credential Registry
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
          Verify ThinkBright <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Digital Certificate Authenticity
          </span>
        </h1>
        <p className="text-sm text-slate-300">
          Employers, institutions, and partners can authenticate genuine certificates issued by ThinkBright Infotech Enterprises in real-time.
        </p>
      </div>

      {/* Verification Query Input */}
      <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Enter Certificate Number / ID
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="cert-verify-input"
                required
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                placeholder="e.g. TB-2026-CERT-0101"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-3.5 text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors uppercase"
              />
            </div>
          </div>

          <button
            type="submit"
            id="verify-cert-submit-btn"
            className="w-full py-3.5 px-6 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/30 transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify Authenticity in Registry</span>
          </button>
        </form>

        {/* Quick Sample IDs */}
        <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center gap-2">
          <span>Try sample verified credentials:</span>
          {certificates.slice(0, 3).map(c => (
            <button
              key={c.id}
              onClick={() => loadSampleCert(c.id)}
              className="px-2 py-1 rounded bg-slate-950 hover:bg-slate-800 text-cyan-300 font-mono text-[11px] border border-slate-800 transition-colors"
            >
              {c.id}
            </button>
          ))}
        </div>
      </div>

      {/* Verification Result Card */}
      {hasSearched && (
        <div className="max-w-3xl mx-auto">
          {searchedRecord ? (
            <div className="p-8 rounded-3xl bg-slate-900 border border-emerald-500/40 shadow-2xl space-y-6">
              
              {/* Top Verified Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wide">
                      Official Record Confirmed
                    </span>
                    <h3 className="text-xl font-bold text-white mt-0.5">
                      Authentic ThinkBright Certificate
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Certificate ID</span>
                  <span className="text-sm font-mono font-bold text-cyan-400">{searchedRecord.id}</span>
                </div>
              </div>

              {/* Digital Certificate Certificate Representation */}
              <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-6 text-center text-xs relative overflow-hidden">
                <div className="flex items-center justify-center gap-3">
                  <img 
                    src="/images/logo.png" 
                    alt="ThinkBright Logo" 
                    className="w-12 h-12 object-contain rounded-xl bg-slate-900 p-1 border border-cyan-500/30"
                  />
                  <div className="text-left">
                    <h4 className="text-base font-extrabold text-white font-display tracking-tight">
                      {THINKBRIGHT_INFO.name}
                    </h4>
                    <p className="text-[10px] text-cyan-400">{THINKBRIGHT_INFO.location}</p>
                  </div>
                </div>

                <div className="space-y-2 py-4 border-y border-slate-800/80">
                  <p className="text-slate-400 uppercase tracking-widest text-[10px]">This is to certify that</p>
                  <p className="text-2xl font-extrabold text-white font-serif">{searchedRecord.learnerName}</p>
                  <p className="text-slate-400 text-xs">has successfully completed the curriculum and fulfilled all practical requirements in</p>
                  <p className="text-base font-bold text-cyan-300">{searchedRecord.programme}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-2 text-left">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Graduation Grade</span>
                    <span className="text-xs font-bold text-emerald-400">{searchedRecord.grade}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Date Issued</span>
                    <span className="text-xs font-medium text-slate-200">{searchedRecord.issueDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Instructor</span>
                    <span className="text-xs font-medium text-slate-200">{searchedRecord.instructor}</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800">
                  <span>Signatory: Opeyemi Israel Okunade (Founder)</span>
                  <span className="text-emerald-400 font-semibold">Status: Active & Valid</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Certificate Verification</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-slate-900 border border-rose-500/40 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
                <XCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Certificate Record Not Found
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                The identifier <strong className="text-rose-400 font-mono">"{certInput}"</strong> does not match any certificate in our official registry. 
                Please verify the ID format or contact our center desk at thinkbrightinfotech@gmail.com.
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
