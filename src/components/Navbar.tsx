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
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_1px_3px_0_rgba(15,23,42,0.05)] transition-all">
      {/* Top micro-bar for quick contact & location */}
      <div className="hidden lg:block bg-slate-900 border-b border-slate-800 py-1.5 px-6 text-[11px] text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 font-medium">
            <span>📍 Behind Musalat Filling Station, Okediji Area, Ilora, Oyo State</span>
            <span className="text-slate-500">|</span>
            <span>🕒 Mon – Sat: 8:00 AM – 6:30 PM</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sky-400 font-semibold">Hotlines: 09034836379 / 09015306791</span>
            <span className="text-slate-600">|</span>
            <a href="mailto:thinkbrightinfotech@gmail.com" className="hover:text-white transition-colors">
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
          <div className="relative w-11 h-11 rounded-xl bg-white p-1 border border-slate-200 shadow-xs group-hover:border-blue-500 transition-all flex items-center justify-center">
            <img 
              src="/images/logo.png" 
              alt="ThinkBright Infotech Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 font-display">
                Think<span className="text-blue-600">Bright</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold uppercase tracking-wider border border-blue-200/80">
                Infotech
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium tracking-wide hidden sm:block">
              Empowering Your Digital Future
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-slate-600">
          {navLinks.slice(0, 8).map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-3 py-2 rounded-lg transition-all ${
                activeTab === link.id
                  ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/80 shadow-2xs'
                  : 'hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          
          {/* More menu */}
          <div className="relative group">
            <button className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-slate-50 flex items-center gap-1 transition-colors">
              <span>More</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
            </button>
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-2 hidden group-hover:block backdrop-blur-xl">
              {navLinks.slice(8).map(link => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                    activeTab === link.id ? 'text-blue-700 bg-blue-50 font-bold' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
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
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-xs transition-all hover:border-blue-400"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Start Learning</span>
          </button>

          <button
            id="nav-cta-apprentice"
            onClick={() => handleNavClick('apprenticeship')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs shadow-blue-500/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Become an Apprentice</span>
          </button>

          {/* Theme Mode Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 relative transition-colors"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-slate-700" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500" />
            )}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              id="notifications-toggle-btn"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 relative transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Notifications Panel */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-bold text-xs text-slate-900 uppercase tracking-wider">Notifications Center</span>
                  <span className="text-[10px] text-blue-600 font-semibold">{unreadNotificationCount} Unread</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto my-2 text-xs">
                  {notifications.map(n => (
                    <div 
                      key={n.id} 
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`p-3 rounded-xl cursor-pointer transition-colors ${n.read ? 'opacity-60 hover:opacity-90' : 'bg-blue-50/50'}`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-900">{n.title}</p>
                        <span className="text-[10px] text-slate-500">{n.createdAt}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">{n.message}</p>
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
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-left transition-all shadow-2xs"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                    {currentUser.displayName.charAt(0)}
                  </div>
                  <div className="hidden md:block">
                    <p className="text-xs font-bold text-slate-900 truncate max-w-[110px]">{currentUser.displayName.split(' ')[0]}</p>
                    <p className="text-[10px] text-blue-600 capitalize font-medium">{currentUser.role.replace('_', ' ')}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Role Switcher & Account Dropdown */}
                {isRoleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in">
                    <div className="px-3 py-2 border-b border-slate-100 mb-2">
                      <p className="font-bold text-xs text-slate-900">{currentUser.displayName}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-200/80">
                        Role: {currentUser.role.toUpperCase().replace('_', ' ')}
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
                              ? 'bg-blue-600 text-white font-bold'
                              : 'hover:bg-slate-50 text-slate-700'
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

                    <div className="pt-2 mt-2 border-t border-slate-100 space-y-1">
                      <button
                        onClick={() => {
                          setActiveTab('portal');
                          setIsRoleDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-2"
                      >
                        <Shield className="w-3.5 h-3.5" />
                        <span>Open Dashboard / Portal</span>
                      </button>
                      <button
                        onClick={() => {
                          signOut();
                          setIsRoleDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-2"
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
                  className="px-3.5 py-2 text-xs font-bold rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <LogIn className="w-3.5 h-3.5 text-blue-600" />
                  <span>Sign In</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu hamburger button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-3 animate-in slide-in-from-top-4 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-4 border-b border-slate-100 text-xs font-bold">
            <button
              onClick={() => handleNavClick('courses')}
              className="py-2.5 px-3 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 flex items-center justify-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Start Learning</span>
            </button>
            <button
              onClick={() => handleNavClick('apprenticeship')}
              className="py-2.5 px-3 rounded-xl bg-blue-600 text-white flex items-center justify-center gap-1.5 shadow-xs"
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
                    ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/80'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            <p className="font-semibold text-slate-800">ThinkBright Infotech</p>
            <p>Okediji Area, Ilora, Oyo State</p>
            <p className="text-blue-600 font-semibold mt-1">Tel: 09034836379 / 09015306791</p>
          </div>
        </div>
      )}
    </header>
  );
};
