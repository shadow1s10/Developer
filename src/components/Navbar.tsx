import React, { useState } from 'react';
import { PageTab } from '../types';

interface NavbarProps {
  activeTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { tab: PageTab; label: string; icon: string }[] = [
    { tab: 'home', label: 'الرئيسية', icon: 'fa-house' },
    { tab: 'faq', label: 'الأسئلة الشائعة', icon: 'fa-circle-question' },
    { tab: 'blog', label: 'المقالات والمدونة', icon: 'fa-newspaper' },
    { tab: 'about', label: 'من نحن', icon: 'fa-user-shield' },
    { tab: 'privacy', label: 'سياسة الخصوصية', icon: 'fa-lock' },
    { tab: 'terms', label: 'شروط الاستخدام', icon: 'fa-file-lines' },
  ];

  const handleNavClick = (tab: PageTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <i className="fas fa-ghost text-lg"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Shadow<span className="text-blue-400">Mail</span>
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  بريد مؤقت مجاني
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                حماية الخصوصية • مانع الرسائل المزعجة
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <i className={`fas ${item.icon} text-xs ${isActive ? 'text-white' : 'text-slate-400'}`}></i>
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-600/20 hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <i className="fas fa-bolt text-yellow-300 text-xs"></i>
              <span>إنشاء بريد فوري</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
              aria-label="القائمة الرئيسية"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-1 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right font-bold text-sm transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <i className={`fas ${item.icon} w-5 text-center text-sm ${isActive ? 'text-white' : 'text-slate-400'}`}></i>
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-3">
            <button
              onClick={() => handleNavClick('home')}
              className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-blue-500 text-white flex items-center justify-center gap-2 shadow-md"
            >
              <i className="fas fa-bolt text-yellow-300"></i>
              <span>إنشاء بريد فوري الآن</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
