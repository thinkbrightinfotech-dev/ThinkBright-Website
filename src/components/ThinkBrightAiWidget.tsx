import React, { useState, useRef, useEffect } from 'react';
import { askThinkBrightAI, ChatMessage } from '../services/aiAssistant';
import { Bot, MessageSquare, X, Send, Sparkles, ChevronRight, User } from 'lucide-react';

const INITIAL_SUGGESTIONS = [
  'What are your course fees?',
  'How do I become an apprentice?',
  'Where is your hub in Ilora located?',
  'What services do you provide?',
  'Do you prepare students for JAMB CBT?'
];

export const ThinkBrightAiWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Hello! I am ThinkBright AI, your intelligent guide to ThinkBright Infotech. How can I help you build your digital future today?',
      timestamp: 'Just now',
      suggestions: INITIAL_SUGGESTIONS
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsTyping(true);

    try {
      const history = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({ role: m.sender === 'user' ? 'user' : 'model', content: m.text }));

      const reply = await askThinkBrightAI(textToSend, history);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'I am experiencing a momentary network lag. Please visit our center Behind Musalat Filling Station, Okediji Area, Ilora or call 09034836379 for immediate assistance.',
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Trigger floating button */}
      {!isOpen && (
        <button
          id="open-thinkbright-ai"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white rounded-full shadow-2xl shadow-cyan-500/30 border border-cyan-400/40 transition-all transform hover:scale-105"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-cyan-200" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-300"></span>
            </span>
          </div>
          <div className="text-left pr-1 hidden sm:block">
            <span className="block text-xs font-bold uppercase tracking-wider text-cyan-200">ThinkBright AI</span>
            <span className="block text-[11px] text-slate-100 font-medium">Ask questions & guidance</span>
          </div>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div 
          id="thinkbright-ai-window"
          className="w-[92vw] sm:w-[380px] h-[520px] max-h-[85vh] bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-white shadow-md shadow-cyan-600/30 border border-cyan-400/40">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-white">ThinkBright AI</h4>
                  <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30">Official</span>
                </div>
                <p className="text-[11px] text-slate-400">Knowledge Assistant • Nigeria</p>
              </div>
            </div>
            <button
              id="close-thinkbright-ai"
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-800/50 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div className={`max-w-[82%] rounded-2xl p-3 ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm'
                }`}>
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                  
                  {/* Suggestions pills */}
                  {msg.suggestions && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1.5">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Suggested queries:</p>
                      <div className="flex flex-col gap-1.5">
                        {msg.suggestions.map((sug, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(sug)}
                            className="text-left text-[11px] py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between transition-colors"
                          >
                            <span>{sug}</span>
                            <ChevronRight className="w-3 h-3 text-cyan-500 shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <span className="block text-[9px] text-slate-400 mt-1 text-right">{msg.timestamp}</span>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-blue-900/60 text-blue-200 flex items-center justify-center shrink-0 border border-blue-700/50 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs pl-9">
                <span className="animate-pulse">ThinkBright AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
          <div className="p-3 bg-slate-950 border-t border-slate-800">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                id="thinkbright-ai-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about courses, fees, apprenticeship..."
                className="flex-1 bg-slate-900 text-white placeholder-slate-500 text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button
                type="submit"
                id="thinkbright-ai-send"
                disabled={!input.trim() || isTyping}
                className="p-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white rounded-xl transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
