import React from 'react';

export const TermsView: React.FC = () => {
  return (
    <div className="py-12 sm:py-20 bg-slate-950 min-h-[75vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center sm:text-right">
          <div className="inline-flex items-center gap-2 text-xs text-blue-400 font-bold bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20 mb-4">
            <i className="fas fa-file-lines"></i>
            <span>اتفاقية الاستخدام • شروط الخدمة</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            شروط وقوانين الاستخدام (Terms of Service)
          </h1>
          <p className="mt-3 text-slate-400 text-sm">
            يرجى قراءة هذه الشروط بعناية قبل استخدام أداة وموقع Shadow Mail. استخدامك للموقع يعتبر موافقة صريحة على هذه البنود.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <i className="fas fa-handshake text-blue-400"></i>
              <span>1. قبول الشروط</span>
            </h2>
            <p className="text-slate-400">
              باستخدامك لموقع <strong className="text-white">Shadow Mail</strong> أو أي من المزايا والأدوات التابعة له، فإنك توافق على الالتزام بجميع بنود وشروط هذه الاتفاقية. إذا كنت لا توافق على أي بند منها، فيجب عليك التوقف فوراً عن استخدام الخدمة.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <i className="fas fa-gavel text-blue-400"></i>
              <span>2. الاستخدام المشروع والمحظورات الصارمة</span>
            </h2>
            <p className="text-slate-400">
              تم توفير هذه الخدمة حصرياً لحماية خصوصية المستخدمين ومنع الرسائل الترويجية غير المرغوبة. يُحظر تماماً استخدام الخدمة في:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400 pr-2">
              <li>أي نشاط احتيالي، أو انتحال شخصية، أو التعدي على حقوق الآخرين.</li>
              <li>محاولة اختراق المواقع، أو تنفيذ هجمات حجب الخدمة (DDoS)، أو نشر البرمجيات الخبيثة.</li>
              <li>إنشاء حسابات وهمية جماعية لأغراض التلاعب بالأنظمة الرقمية أو انتهاك شروط منصات أخرى.</li>
              <li>أي نشاط يخالف القوانين المحلية أو الدولية المعمول بها في مكافحة الجرائم السيبرانية.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <i className="fas fa-hourglass-half text-blue-400"></i>
              <span>3. طبيعة الخدمة المؤقتة وعدم وجود ضمانات أرشفة</span>
            </h2>
            <p className="text-slate-400">
              يقر المستخدم ويدرك تماماً أن:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400 pr-2">
              <li>عناوين البريد الإلكتروني مؤقتة ومصممة للحذف التلقائي. لا يمكن استرداد الرسائل بعد انقضاء فترتها.</li>
              <li>الخدمة غير مخصصة للحسابات الحيوية أو استرجاع كلمات المرور للحسابات البنكية والرسمية.</li>
              <li>تتحمل أنت وحدك كامل المسؤولية عن أي خسارة تنتج عن استخدام عنوان مؤقت لخدمة تحتاج فيها إلى بقاء البريد فعالاً.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <i className="fas fa-shield-halved text-blue-400"></i>
              <span>4. إخلاء المسؤولية (Disclaimer of Warranties)</span>
            </h2>
            <p className="text-slate-400">
              يتم تقديم خدمة Shadow Mail "كما هي" (AS IS) و "حسب التوفر" (AS AVAILABLE) دون أي ضمانات صريحة أو ضمنية من أي نوع، بما في ذلك ضمان عدم انقطاع الخدمة أو دقة وصول الرسائل بنسبة 100% في جميع الأوقات، نظراً لاعتماد النظام على بروتوكولات الإنترنت ومزودي الخوادم.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <i className="fas fa-arrows-rotate text-blue-400"></i>
              <span>5. تعديل الخدمة أو إيقافها</span>
            </h2>
            <p className="text-slate-400">
              نحتفظ بحق تحديث الخدمة، أو إضافة مزايا، أو تقييد الوصول مؤقتاً لأغراض الصيانة الدورية دون الحاجة لإشعار مسبق.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
