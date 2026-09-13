import React from 'react';
import { PageTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: PageTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const handleNav = (tab: PageTab) => {
    onSelectTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/60">
          {/* Brand Col */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
                <i className="fas fa-ghost text-lg"></i>
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Shadow<span className="text-blue-400">Mail</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              خدمة بريد إلكتروني مؤقت احترافية ومجانية بالكامل لحماية خصوصيتك الرقمية ومنع الرسائل الترويجية المزعجة (Spam). استقبل رموز OTP ورسائل التفعيل بأمان تام.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                خدمة مجانية 100%
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/60 text-blue-300 border border-blue-800/50">
                <i className="fas fa-shield-halved text-[10px]"></i>
                No-Logs Policy
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-base font-bold mb-4 flex items-center gap-2">
              <i className="fas fa-compass text-blue-400 text-sm"></i>
              <span>روابط سريعة</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-angle-left text-xs text-slate-600"></i>
                  <span>الرئيسية وصندوق البريد</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('blog')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-angle-left text-xs text-slate-600"></i>
                  <span>المقالات والمدونة التقنية</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faq')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-angle-left text-xs text-slate-600"></i>
                  <span>الأسئلة الشائعة (FAQ)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-angle-left text-xs text-slate-600"></i>
                  <span>من نحن ورسالتنا</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div>
            <h4 className="text-white text-base font-bold mb-4 flex items-center gap-2">
              <i className="fas fa-scale-balanced text-blue-400 text-sm"></i>
              <span>السياسات والقانون</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('privacy')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-angle-left text-xs text-slate-600"></i>
                  <span>سياسة الخصوصية</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('terms')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-angle-left text-xs text-slate-600"></i>
                  <span>شروط وقوانين الاستخدام</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faq')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-angle-left text-xs text-slate-600"></i>
                  <span>إرشادات الأمان الرقمي</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Security & Privacy Commitment */}
          <div className="space-y-4">
            <h4 className="text-white text-base font-bold flex items-center gap-2">
              <i className="fas fa-user-lock text-blue-400 text-sm"></i>
              <span>التزامنا الصارم بالخصوصية</span>
            </h4>
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
              <p>
                نحن ملتزمون بعدم جمع أي بيانات شخصية، ولا نقوم بتسجيل عناوين IP، ويتم إتلاف كافة الرسائل ومحتواها تلقائياً بعد انتهاء صلاحيتها لحماية خصوصية زوارنا دون قيد أو شرط.
              </p>
            </div>
            <div className="text-xs text-slate-500">
              <i className="fas fa-circle-check text-emerald-400 ml-1.5"></i>
              لا يتطلب الموقع أي تسجيل أو كلمات مرور أو هواتف.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} Shadow Mail • أداة البريد المؤقت الآمن.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>تشفير SSL متقدم</span>
            <span>•</span>
            <span>حذف ذاتي مستمر</span>
            <span>•</span>
            <span>حماية ضد السبام</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
