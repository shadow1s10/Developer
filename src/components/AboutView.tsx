import React from 'react';
import { PageTab } from '../types';

interface AboutViewProps {
  onGoHome: () => void;
  onSelectTab: (tab: PageTab) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onGoHome }) => {
  return (
    <div className="py-12 sm:py-20 bg-slate-950 min-h-[75vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-10 text-center sm:text-right">
          <div className="inline-flex items-center gap-2 text-xs text-blue-400 font-bold bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20 mb-4">
            <i className="fas fa-shield-halved"></i>
            <span>من نحن • رسالتنا ورؤيتنا</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            حماية الخصوصية الرقمية حق أساسي لكل مستخدم
          </h1>
          <p className="mt-4 text-slate-400 text-base leading-relaxed max-w-2xl">
            تأسست خدمة <span className="text-blue-400 font-bold">Shadow Mail</span> كمنصة حرة ومستقلة متخصصة في توفير حلول بريد إلكتروني مؤقتة فائقة السرعة، لمساعدة المستخدمين حول العالم على استعادة السيطرة الكاملة على بياناتهم الشخصية وصناديق بريدهم.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 text-right hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-400 border border-blue-500/20 flex items-center justify-center text-xl mb-4">
              <i className="fas fa-user-secret"></i>
            </div>
            <h3 className="text-base font-bold text-white mb-2">سرية مطلقة (No-Logs)</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              لا نطلب ولا نسجل اسمك أو بريدك أو رقم هاتفك أو عنوان IP الخاص بك. تصفحك واستقبالك للرسائل يتم في سرية تامة دون أي تتبع.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 text-right hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center text-xl mb-4">
              <i className="fas fa-bolt-lightning"></i>
            </div>
            <h3 className="text-base font-bold text-white mb-2">استجابة فائقة السرعة</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              بفضل ربطنا البرمجي المباشر والمستقر، تصل رسائل التأكيد ورموز التفعيل (OTP) في ثوانٍ معدودة دون انتظار أو تأخير مزعج.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 text-right hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-xl mb-4">
              <i className="fas fa-lock"></i>
            </div>
            <h3 className="text-base font-bold text-white mb-2">تدمير ذاتي مستمر</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              يتم مسح كافة الرسائل والعناوين تلقائياً بعد انقضاء المهلة الزمنية، مما يضمن عدم تخزين أي رسائل على خوادمنا بشكل دائم.
            </p>
          </div>
        </div>

        {/* Detailed Narrative */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed mb-12">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <i className="fas fa-bullseye text-blue-400"></i>
            <span>فلسفة المشروع ونهج الأمان</span>
          </h2>
          <p>
            في ظل الانتشار الهائل لتقنيات تتبع المستخدمين وتجارة البيانات الإعلانية، أصبحت عناوين البريد الإلكتروني وسيلة شائعة لربط سلوك المستخدم عبر مئات المواقع. كل نقرة وكل تسجيل في موقع ترويجي أو مدونة قد يؤدي إلى إغراق بريدك الشخصي برسائل دعائية لا نهاية لها، بل وقد يعرضك لخطر الاحتيال عند حدوث اختراقات للبيانات.
          </p>
          <p>
            انطلقت <strong className="text-white">Shadow Mail</strong> كفريق تقني مستقل متخصص في أمن المعلومات وتطوير أدوات الويب المفتوحة، بهدف بناء درع حماية رقمي مجاني ومتاح للجميع في الوطن العربي وحول العالم، يتيح إتمام عمليات التفعيل والتسجيل بمرونة مطلقة ودون التضحية بالخصوصية.
          </p>
          <p>
            نحن لا نبيع أي بيانات، ولا نقوم بربط هويات المستخدمين بأي سجلات، ونحرص دائماً على تطبيق أعلى معايير التشفير والأمان عبر بروتوكولات SSL/TLS الحديثة.
          </p>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border border-blue-500/30 rounded-3xl p-8 text-center sm:flex sm:items-center sm:justify-between gap-6">
          <div className="text-right mb-4 sm:mb-0">
            <h3 className="text-lg font-bold text-white">جاهز لبدء استخدام البريد المؤقت؟</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              احصل على عنوانك الفوري الآن مجاناً وبدون أي تسجيل مسبق.
            </p>
          </div>
          <button
            onClick={onGoHome}
            className="px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 shrink-0 w-full sm:w-auto"
          >
            <i className="fas fa-bolt text-yellow-300"></i>
            <span>انتقل إلى صندوق البريد</span>
          </button>
        </div>
      </div>
    </div>
  );
};
