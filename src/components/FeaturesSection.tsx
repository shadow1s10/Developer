import React from 'react';
import { FEATURES } from '../data/content';

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-900/50 border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
            <i className="fas fa-sparkles text-xs"></i>
            أقوى مزايا البريد المهمل المؤقت
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            لماذا يختار ملايين المستخدمين <span className="text-blue-400">Shadow Mail</span>؟
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            صممنا هذه الخدمة لتمنحك تحكماً كاملاً وسرعة استثنائية في استقبال رسائل التحقق والتسجيل دون تعريض أمانك الشخصي لأي خطر.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-400 border border-blue-500/20 flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                {item.badge && (
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {item.badge}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
