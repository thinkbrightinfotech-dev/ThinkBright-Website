import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  CheckCircle, 
  Terminal, 
  BookOpen, 
  ShieldCheck, 
  Play, 
  RotateCcw, 
  ChevronRight, 
  Layers, 
  Award 
} from 'lucide-react';

const CBT_SAMPLE_QUESTIONS = [
  {
    id: 1,
    subject: 'Computer Studies / ICT',
    question: 'Which of the following computer components is responsible for executing instructions and arithmetic logic operations?',
    options: ['Random Access Memory (RAM)', 'Central Processing Unit (CPU)', 'Hard Disk Drive (HDD)', 'Read Only Memory (ROM)'],
    answer: 1,
    explanation: 'The CPU (Central Processing Unit) contains the ALU (Arithmetic Logic Unit) and Control Unit responsible for executing program instructions.'
  },
  {
    id: 2,
    subject: 'Web Technologies',
    question: 'In modern frontend web development, which CSS layout model is specifically designed for one-dimensional layouts?',
    options: ['CSS Grid', 'Float Positioning', 'Flexbox (Flexible Box)', 'Inline Block'],
    answer: 2,
    explanation: 'Flexbox is designed for 1-dimensional layouts (rows or columns), while CSS Grid handles 2-dimensional layouts (both rows and columns simultaneously).'
  },
  {
    id: 3,
    subject: 'Digital Security',
    question: 'What is the primary purpose of Two-Factor Authentication (2FA) when accessing digital accounts?',
    options: [
      'To double your internet browsing speed',
      'To verify identity through two independent forms of evidence',
      'To allow two different users to share the same password',
      'To compress file sizes for faster transmission'
    ],
    answer: 1,
    explanation: '2FA strengthens security by requiring two distinct factors: something you know (password) and something you have (phone/authenticator app).'
  },
  {
    id: 4,
    subject: 'Python Programming',
    question: 'Which keyword in Python is used to define a reusable block of code or function?',
    options: ['function', 'define', 'def', 'proc'],
    answer: 2,
    explanation: 'Python uses the keyword "def" followed by the function name and parentheses to declare functions.'
  },
  {
    id: 5,
    subject: 'General Digital Literacy',
    question: 'What does CAC represent in Nigerian business registration and enterprise documentation?',
    options: [
      'Central Academic Commission',
      'Corporate Affairs Commission',
      'Commerce Audit Council',
      'Company Allocation Corporation'
    ],
    answer: 1,
    explanation: 'The Corporate Affairs Commission (CAC) is the autonomous body established under Nigerian law to regulate the formation and management of companies.'
  }
];

export const LabsView: React.FC = () => {
  const [activeSimulator, setActiveSimulator] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectOption = (qId: number, optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    CBT_SAMPLE_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.answer) score += 1;
    });
    return score;
  };

  const restartExam = () => {
    setSelectedAnswers({});
    setCurrentQIndex(0);
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          ThinkBright Labs • R&D
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
          Engineering Software for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Real African Realities
          </span>
        </h1>
        <p className="text-sm text-slate-300">
          Our innovation lab incubates software solutions for schools, businesses, and exam centers. 
          Built to operate reliably in low-bandwidth, offline-first environments.
        </p>
      </div>

      {/* The 3 Proprietary Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Product 1: School OS */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 flex flex-col justify-between hover:border-cyan-500/40 transition-all">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950 text-cyan-400 flex items-center justify-center border border-cyan-800/40">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">EdTech Infrastructure</span>
              <h3 className="text-xl font-bold text-white mt-1">ThinkBright School OS</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              An all-in-one school management suite custom-crafted for Nigerian schools. Generates automated cumulative term report sheets, broadsheets, continuous assessment (CA), student attendance, and fee tracking.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>One-click terminal report card generation</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Teacher score submission portal</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Works 100% offline with local sync</span>
              </li>
            </ul>
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-blue-950 text-cyan-300 text-xs font-semibold text-center border border-blue-800">
            Private Beta for Partner Schools
          </span>
        </div>

        {/* Product 2: CBT Platform */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-cyan-500/30 space-y-5 flex flex-col justify-between shadow-xl shadow-cyan-950/20">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-950 text-cyan-400 flex items-center justify-center border border-blue-800/40">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Active Demo Available</span>
              <h3 className="text-xl font-bold text-white mt-1">ThinkBright CBT Platform</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Authentic simulation engine for JAMB UTME, WAEC, NECO, and entrance exams. Features standard 8-key keyboard navigation (A, B, C, D, P, N, S, R) and instant result analytics.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Identical to official JAMB examination interface</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Over 15,000 past questions database</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Timer countdown and auto-submission</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => setActiveSimulator(true)}
            className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/30 transition-all"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Launch Interactive CBT Simulator Demo</span>
          </button>
        </div>

        {/* Product 3: Business OS */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 flex flex-col justify-between hover:border-cyan-500/40 transition-all">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-950 text-indigo-400 flex items-center justify-center border border-indigo-800/40">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Enterprise OS</span>
              <h3 className="text-xl font-bold text-white mt-1">ThinkBright Business OS</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Lightweight point-of-sale, stock inventory, and invoicing software tailored for African retail stores, pharmacies, cybercafes, and workshops.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Daily sales receipt printing & WhatsApp invoicing</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Inventory low-stock SMS alerts</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Customer ledger & debt recovery tracker</span>
              </li>
            </ul>
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold text-center border border-slate-700">
            Coming Soon Q3 2026
          </span>
        </div>

      </div>

      {/* Interactive CBT Simulator Showcase */}
      {activeSimulator && (
        <div className="p-8 rounded-3xl bg-slate-950 border border-cyan-500/40 shadow-2xl space-y-6 animate-in fade-in">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
            <div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                ThinkBright CBT Engine • Live Exam Mode
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                JAMB / WAEC Simulation Exam
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-amber-400">
                ⏱ Time Left: 14:45
              </span>
              <button
                onClick={() => setActiveSimulator(false)}
                className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                Exit Simulator
              </button>
            </div>
          </div>

          {/* Question View */}
          {!isSubmitted ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Question {currentQIndex + 1} of {CBT_SAMPLE_QUESTIONS.length}</span>
                <span className="text-cyan-400 font-semibold">{CBT_SAMPLE_QUESTIONS[currentQIndex].subject}</span>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <p className="text-sm font-semibold text-white leading-relaxed">
                  {CBT_SAMPLE_QUESTIONS[currentQIndex].question}
                </p>

                <div className="space-y-2.5 pt-2">
                  {CBT_SAMPLE_QUESTIONS[currentQIndex].options.map((opt, idx) => {
                    const isSelected = selectedAnswers[CBT_SAMPLE_QUESTIONS[currentQIndex].id] === idx;
                    const letter = ['A', 'B', 'C', 'D'][idx];
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(CBT_SAMPLE_QUESTIONS[currentQIndex].id, idx)}
                        className={`w-full p-3.5 rounded-xl text-left text-xs font-medium flex items-center gap-3 transition-all border ${
                          isSelected
                            ? 'bg-cyan-950 border-cyan-500 text-cyan-200 shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-850'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                          isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {letter}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CBT Keyboard Navigation Controls (The Authentic 8-Key UI) */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentQIndex === 0}
                    onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-semibold"
                  >
                    [P] Previous
                  </button>
                  <button
                    disabled={currentQIndex === CBT_SAMPLE_QUESTIONS.length - 1}
                    onClick={() => setCurrentQIndex(prev => Math.min(CBT_SAMPLE_QUESTIONS.length - 1, prev + 1))}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-semibold"
                  >
                    [N] Next
                  </button>
                </div>

                {/* Question Selector Quick Grid */}
                <div className="flex items-center gap-1.5">
                  {CBT_SAMPLE_QUESTIONS.map((q, idx) => (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`w-8 h-8 rounded-lg font-mono font-bold text-xs transition-colors ${
                        currentQIndex === idx
                          ? 'border-2 border-cyan-400 text-white bg-cyan-950'
                          : selectedAnswers[q.id] !== undefined
                          ? 'bg-emerald-900 text-emerald-200'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setIsSubmitted(true)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-600/30"
                >
                  [S] Submit Exam
                </button>
              </div>
            </div>
          ) : (
            /* Result Screen */
            <div className="p-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/30">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white font-display">CBT Score Breakdown</h4>
                <p className="text-xs text-slate-400 mt-1">Instant evaluation powered by ThinkBright CBT Engine</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 max-w-sm mx-auto">
                <span className="text-4xl font-black font-mono text-cyan-400">
                  {calculateScore()} / {CBT_SAMPLE_QUESTIONS.length}
                </span>
                <p className="text-xs text-slate-300 mt-2 font-semibold">
                  Percentage: {((calculateScore() / CBT_SAMPLE_QUESTIONS.length) * 100).toFixed(0)}%
                </p>
              </div>

              {/* Explanations */}
              <div className="text-left space-y-3 max-w-xl mx-auto text-xs">
                <p className="font-bold text-slate-300 uppercase tracking-wider">Answer Review & Explanations:</p>
                {CBT_SAMPLE_QUESTIONS.map((q, i) => {
                  const userAns = selectedAnswers[q.id];
                  const isCorrect = userAns === q.answer;
                  return (
                    <div key={q.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between font-semibold">
                        <span className="text-white">Q{i + 1}: {q.question}</span>
                        <span className={`text-[11px] font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isCorrect ? 'Correct (+1)' : 'Incorrect'}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-1">{q.explanation}</p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={restartExam}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
