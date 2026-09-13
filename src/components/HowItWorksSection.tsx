import React from 'react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: 'fa-copy',
      title: 'انسخ العنوان فوراً',
      desc: 'بمجرد فتح الموقع، يتم تجهيز عنوان بريد عشوائي فعال فوراً. انقر على زر "نسخ العنوان" الأزرق ليتم حفظه في الحافظة.'
    },
    {
      num: '02',
      icon: 'fa-arrow-up-right-from-square',
      title: 'استخدمه في أي منصة',
      desc: 'الصق العنوان المؤقت في صفحة التسجيل أو التفعيل لأي تطبيق أو متجر أو منتدى أو خدمة تجريبية ترغب بتجربتها.'
    },
    {
      num: '03',
      icon: 'fa-inbox',
      title: 'استقبل الرسالة والـ OTP',
      desc: 'ستصل رسالتك في قسم "صندوق الوارد" خلال ثوانٍ. انقر على الرسالة لقراءة المحتوى ونسخ كود التحقق OTP بنقرة واحدة.'
    },
    {
      num: '04',
      icon: 'fa-shield-halved',
      title: 'تدمير آمن وحماية دائمة',
      desc: 'بعد الانتهاء، تتلف الرسائل تلقائياً بعد انتهاء صلاحية الصندوق، ويبقى بريدك الشخصي محمياً للأبد من الرسائل المزعجة.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
            <i className="fas fa-route text-xs"></i>
            خطوات بسيطة وسريعة
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            كيف تعمل أداة <span className="text-blue-400">Shadow Mail</span>؟
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            لا داعي لكتابة كلمات مرور، أو تحميل برامج، أو التسجيل بحسابات خارجية. 4 خطوات سريعة فقط تفصلك عن حماية خصوصيتك.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 relative hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-lg shadow-md shadow-blue-500/20">
                    <i className={`fas ${step.icon}`}></i>
                  </div>
                  <span className="text-3xl font-black text-slate-800 font-mono select-none">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/50 flex items-center gap-2 text-xs text-blue-400 font-medium">
                <i className="fas fa-circle-check text-emerald-400"></i>
                <span>فوري ومؤمن 100%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
