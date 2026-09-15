import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { 
  Compass, 
  BookOpen, 
  Briefcase, 
  Cpu, 
  FolderGit2, 
  HeartHandshake, 
  Newspaper, 
  Calendar, 
  CheckCircle2, 
  PhoneCall, 
  User, 
  Bell, 
  LogOut, 
  LogIn, 
  Shield, 
  Menu, 
  X,
  ChevronDown,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenPayment?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { 
    currentUser, 
    signInWithGoogle, 
    signInDemoUser, 
    signOut, 
    switchRole, 
    notifications, 
    unreadNotificationCount, 
    markNotificationAsRead 
  } = useAuth();

  const { theme, toggleTheme } = useTheme();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'courses', label: 'Courses' },
    { id: 'apprenticeship', label: 'Apprenticeship' },
    { id: 'services', label: 'Services' },
    { id: 'labs', label: 'ThinkBright Labs' },
    { id: 'projects', label: 'Projects' },
    { id: 'impact', label: 'Impact' },
    { id: 'blog', label: 'Blog' },
    { id: 'events', label: 'Events' },
    { id: 'verify', label: 'Verify Certificate' },
    { id: 'contact', label: 'Contact' },
  ];

  const rolesList: { role: UserRole; label: string; desc: string }[] = [
    { role: 'super_admin', label: 'Super Admin (Founder)', desc: 'Executive control, CMS, financial overview' },
    { role: 'admin', label: 'Operations Admin', desc: 'Application review, payment verification' },
    { role: 'instructor', label: 'Lead Instructor', desc: 'Attendance marking, grading, progress' },
    { role: 'apprentice', label: 'Active Apprentice', desc: 'Learning progress, agreement, fee balance' },
    { role: 'parent', label: 'Parent / Guardian', desc: 'Ward attendance, assessment, invoices' },
    { role: 'business_customer', label: 'Business Customer', desc: 'Service requests, branding orders, invoices' },
    { role: 'finance', label: 'Finance Officer', desc: 'Manual payment audit & official receipts' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 transition-all">
      {/* Top micro-bar for quick contact & location */}
      <div className="hidden lg:block bg-slate-900/40 border-b border-slate-800/60 py-1.5 px-6 text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span>📍 Behind Musalat Filling Station, Okediji Area, Ilora, Oyo State</span>
            <span>🕒 Mon – Sat: 8:00 AM – 6:30 PM</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-cyan-400 font-medium">Official Hotlines: 09034836379 / 09015306791</span>
            <span className="text-slate-600">|</span>
            <a href="mailto:thinkbrightinfotech@gmail.com" className="hover:text-cyan-300 transition-colors">
              thinkbrightinfotech@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="relative w-12 h-12 rounded-2xl bg-slate-900 p-1 border border-slate-800 shadow-sm group-hover:border-cyan-400 transition-all">
            <img 
              src="/images/logo.png" 
              alt="ThinkBright Infotech Logo" 
              className="w-full h-full object-contain filter drop-shadow"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white font-display">
                Think<span className="text-cyan-400">Bright</span>
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-blue-950 text-cyan-300 font-bold uppercase tracking-wider border border-blue-800">
                Infotech
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">
              Empowering Your Digital Future
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-slate-300">
          {navLinks.slice(0, 8).map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-3 py-2 rounded-lg transition-all ${
                activeTab === link.id
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                  : 'hover:text-white hover:bg-slate-900/60'
              }`}
            >
              {link.label}
            </button>
          ))}
          
          {/* More menu */}
          <div className="relative group">
            <button className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-900/60 flex items-center gap-1 transition-colors">
              <span>More</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            <div className="absolute top-full left-0 mt-1 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-2 hidden group-hover:block backdrop-blur-xl">
              {navLinks.slice(8).map(link => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                    activeTab === link.id ? 'text-cyan-400 bg-cyan-950/40' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* CTA Actions & User Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Primary Quick CTA buttons */}
          <button
            id="nav-cta-learn"
            onClick={() => handleNavClick('courses')}
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 transition-all hover:border-cyan-400"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Start Learning</span>
          </button>

          <button
            id="nav-cta-apprentice"
            onClick={() => handleNavClick('apprenticeship')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Become an Apprentice</span>
          </button>

          {/* Theme Mode Toggle (Simple & Sophisticated) */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white relative transition-colors"
            title={theme === 'light' ? 'Switch to Sophisticated Dark' : 'Switch to Clean Light'}
            aria-label={theme === 'light' ? 'Switch to Sophisticated Dark' : 'Switch to Clean Light'}
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-slate-700" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              id="notifications-toggle-btn"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white relative transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 font-bold text-[9px] flex items-center justify-center">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Notifications Panel */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="font-bold text-xs text-white uppercase tracking-wider">Notifications Center</span>
                  <span className="text-[10px] text-cyan-400 font-semibold">{unreadNotificationCount} Unread</span>
                </div>
                <div className="divide-y divide-slate-800/80 max-h-72 overflow-y-auto my-2 text-xs">
                  {notifications.map(n => (
                    <div 
                      key={n.id} 
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`p-3 rounded-xl cursor-pointer transition-colors ${n.read ? 'opacity-60 hover:opacity-90' : 'bg-slate-950/60'}`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-white">{n.title}</p>
                        <span className="text-[10px] text-slate-500">{n.createdAt}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] mt-1 leading-relaxed">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Account / Role Switcher */}
          <div className="relative">
            {currentUser ? (
              <div className="flex items-center gap-1.5">
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-left transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-700 text-white font-bold text-xs flex items-center justify-center">
                    {currentUser.displayName.charAt(0)}
                  </div>
                  <div className="hidden md:block">
                    <p className="text-xs font-bold text-white truncate max-w-[110px]">{currentUser.displayName.split(' ')[0]}</p>
                    <p className="text-[10px] text-cyan-400 capitalize font-medium">{currentUser.role.replace('_', ' ')}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Role Switcher & Account Dropdown */}
                {isRoleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in">
                    <div className="px-3 py-2 border-b border-slate-800 mb-2">
                      <p className="font-bold text-xs text-white">{currentUser.displayName}</p>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-semibold border border-cyan-800">
                        Current Role: {currentUser.role.toUpperCase().replace('_', ' ')}
                      </span>
                    </div>

                    <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Switch Role View (Demo Testing)
                    </p>
                    <div className="space-y-1 max-h-56 overflow-y-auto">
                      {rolesList.map(item => (
                        <button
                          key={item.role}
                          onClick={() => {
                            switchRole(item.role);
                            setIsRoleDropdownOpen(false);
                            setActiveTab('portal');
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between ${
                            currentUser.role === item.role
                              ? 'bg-cyan-600 text-white font-bold'
                              : 'hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          <div>
                            <p>{item.label}</p>
                            <p className="text-[9px] opacity-75 font-normal">{item.desc}</p>
                          </div>
                          {currentUser.role === item.role && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                        </button>
                      ))}
                    </div>

                    <div className="pt-2 mt-2 border-t border-slate-800 space-y-1">
                      <button
                        onClick={() => {
                          setActiveTab('portal');
                          setIsRoleDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-cyan-300 hover:bg-slate-800 transition-colors flex items-center gap-2"
                      >
                        <Shield className="w-3.5 h-3.5" />
                        <span>Open Dashboard / Portal</span>
                      </button>
                      <button
                        onClick={() => {
                          signOut();
                          setIsRoleDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-950/40 transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="google-signin-btn"
                  onClick={signInWithGoogle}
                  className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Sign In</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu hamburger button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-slate-950 border-b border-slate-800 px-6 py-5 space-y-3 animate-in slide-in-from-top-4">
          <div className="grid grid-cols-2 gap-2 pb-4 border-b border-slate-800 text-xs font-bold">
            <button
              onClick={() => handleNavClick('courses')}
              className="py-2.5 px-3 rounded-xl bg-slate-900 text-cyan-300 border border-cyan-500/30 flex items-center justify-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>Start Learning</span>
            </button>
            <button
              onClick={() => handleNavClick('apprenticeship')}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Apply Apprenticeship</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`py-2 px-3 rounded-xl text-left transition-colors ${
                  activeTab === link.id
                    ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
            <p className="font-semibold text-slate-200">ThinkBright Infotech</p>
            <p>Okediji Area, Ilora, Oyo State</p>
            <p className="text-cyan-400 mt-1">Tel: 09034836379 / 09015306791</p>
          </div>
        </div>
      )}
    </header>
  );
};
