import React, { useState } from 'react';
import { PageTab } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TempMailTool } from './components/TempMailTool';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { FaqSection } from './components/FaqSection';
import { SeoArticleSection } from './components/SeoArticleSection';
import { AboutView } from './components/AboutView';
import { PrivacyView } from './components/PrivacyView';
import { TermsView } from './components/TermsView';
import { BlogView } from './components/BlogView';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-['Cairo',system-ui,sans-serif] selection:bg-blue-600 selection:text-white">
      {/* Global Navigation Bar */}
      <Navbar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* ── HOME VIEW (Kept mounted to preserve email session & timer) ── */}
        <div className={activeTab === 'home' ? 'block' : 'hidden'}>
          {/* Top Hero Framing */}
          <section className="relative pt-8 sm:pt-14 pb-12 overflow-hidden bg-radial from-blue-950/40 via-slate-950 to-slate-950">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Hero Header Introduction */}
              <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                  <span>البريد المؤقت الأكثر أماناً وموثوقية في الوطن العربي</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight sm:leading-snug">
                  بريد إلكتروني مؤقت وفوري{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                    لحماية خصوصيتك التامة
                  </span>
                </h1>
                <p className="mt-4 text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed">
                  احصل على عنوان بريد مهمل في ثانية واحدة لاستقبال رسائل التفعيل ورموز OTP. بدون تسجيل، بدون إعلانات مزعجة، وحذف ذاتي للرسائل.
                </p>

                {/* Quick Trust Badges */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300 font-medium">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                    <i className="fas fa-check-circle text-emerald-400"></i>
                    <span>مجاني 100%</span>
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                    <i className="fas fa-shield-check text-blue-400"></i>
                    <span>تشفير كامل للبيانات</span>
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                    <i className="fas fa-user-slash text-indigo-400"></i>
                    <span>بدون تسجيل حساب</span>
                  </span>
                </div>
              </div>

              {/* ── TOOL INTEGRATION CONTAINER (Prominently Placed in Hero) ── */}
              <div className="w-full relative">
                <TempMailTool />
              </div>
            </div>
          </section>

          {/* Key Metrics / Trust Bar */}
          <section className="py-8 bg-slate-900/80 border-y border-slate-800/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="p-4">
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                    <span className="text-blue-400">&lt;</span> 3 ثوانٍ
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                    متوسط وقت استلام الرسالة
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                    100%
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                    حماية من رسائل السبام
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                    0 سجلات
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                    سياسة عدم الاحتفاظ بالبيانات
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                    5 دقائق
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                    صلاحية قابلة للتجديد
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <FeaturesSection />

          {/* How It Works Section */}
          <HowItWorksSection />

          {/* FAQ Section */}
          <FaqSection />

          {/* SEO Rich Educational Content */}
          <SeoArticleSection />
        </div>

        {/* ── OTHER PAGES ── */}
        {activeTab === 'about' && (
          <AboutView
            onGoHome={() => setActiveTab('home')}
            onSelectTab={setActiveTab}
          />
        )}

        {activeTab === 'privacy' && <PrivacyView />}

        {activeTab === 'terms' && <TermsView />}

        {activeTab === 'blog' && <BlogView />}

        {activeTab === 'faq' && (
          <div className="py-12 bg-slate-950 min-h-[75vh]">
            <FaqSection />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer onSelectTab={setActiveTab} />
    </div>
  );
}
