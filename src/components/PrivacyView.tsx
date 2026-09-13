import React from 'react';

export const PrivacyView: React.FC = () => {
  return (
    <div className="py-12 sm:py-20 bg-slate-950 min-h-[75vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center sm:text-right">
          <div className="inline-flex items-center gap-2 text-xs text-blue-400 font-bold bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20 mb-4">
            <i className="fas fa-lock"></i>
            <span>وثيقة رسمية • سياسة الخصوصية</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            سياسة الخصوصية وحماية البيانات (Privacy Policy)
          </h1>
          <p className="mt-3 text-slate-400 text-sm">
            آخر تحديث: سبتمبر 2026 • تلتزم منصة Shadow Mail بأعلى معايير الشفافية والسرية المطلقة.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <i className="fas fa-file-shield text-blue-400"></i>
              <span>1. مقدمة والتزام عام</span>
            </h2>
            <p className="text-slate-400">
              في خدمة <strong className="text-white">Shadow Mail</strong>، نعتبر خصوصيتك وأمان بياناتك على رأس أولوياتنا. تهدف هذه السياسة إلى توضيح كيفية تعاملنا مع البيانات أثناء استخدامك لخدمة البريد المؤقت لدينا. إن المبدأ الجوهري لخدمتنا هو <strong className="text-blue-400">عدم جمع أو تخزين أي معلومات شخصية يمكن أن تحدد هويتك</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <i className="fas fa-ban text-blue-400"></i>
              <span>2. سياسة عدم الاحتفاظ بالسجلات (No-Logs Policy)</span>
            </h2>
            <p className="text-slate-400">
              نحن نطبق سياسة صارمة تنص على الآتي:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400 pr-2">
              <li>لا نطلب منك إنشاء حساب، أو إدخال اسم، أو كلمة مرور، أو رقم هاتف، أو بطاقة ائتمان.</li>
              <li>لا نقوم بتسجيل أو حفظ عناوين بروتوكول الإنترنت (IP Addresses) للمستخدمين.</li>
              <li>لا نقوم بربط أي رسالة بريدية واردة بهوية مستخدم حقيقي أو متصفح معين.</li>
              <li>لا نستخدم ملفات تتبع إعلانية لأطراف ثالثة تهدف لبناء ملفات تعريفية عنك.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <i className="fas fa-envelope-open-text text-blue-400"></i>
              <span>3. معالجة الرسائل الإلكترونية الواردة وعمر الصندوق</span>
            </h2>
            <p className="text-slate-400">
              إن الغرض الوحيد لخدمة Shadow Mail هو استقبال رسائل التفعيل ورموز التحقق (OTP) والتأكيد الفوري.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400 pr-2">
              <li>تبقى الرسائل متاحة في صندوق الوارد خلال فترة صلاحية الجلسة المحددة (5 دقائق قابلة للتجديد).</li>
              <li>بمجرد انتهاء صلاحية الصندوق أو طلب توليد عنوان جديد، يتم مسح الرسائل وحذفها من الذاكرة المؤقتة.</li>
              <li>تذكير مهم: نظراً للطبيعة العامة والمؤقتة لخدمات البريد المهمل، لا تقم أبداً باستقبال رسائل مصرفية أو وثائق سرية أو كلمات مرور لحسابات دائمة على هذه العناوين.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <i className="fas fa-database text-blue-400"></i>
              <span>4. التخزين المحلي في المتصفح (LocalStorage)</span>
            </h2>
            <p className="text-slate-400">
              تستخدم الأداة تقنية التخزين المحلي في متصفحك (LocalStorage) حصرياً للأغراض التشغيلية التالية:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400 pr-2">
              <li>حفظ العنوان النشط وموعد انتهاء الجلسة حتى لا تفقد صندوقك عند إعادة تحميل الصفحة.</li>
              <li>حفظ قائمة "سجل الاستعادة" محلياً على جهازك أنت فقط، حتى تتمكن من استرجاع عناوينك السابقة عند الرغبة.</li>
              <li>هذه البيانات لا يتم إرسالها إلى أي خادم خارجي، ويمكنك مسحها تماماً بنقرة واحدة على زر "مسح الكل" أو "إعادة ضبط".</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <i className="fas fa-lock text-blue-400"></i>
              <span>5. أمان نقل البيانات وتشفير الاتصال</span>
            </h2>
            <p className="text-slate-400">
              يتم نقل جميع البيانات والطلبات البرمجية عبر بروتوكول HTTPS المشفر بتشفير SSL/TLS 256-bit، مما يمنع اعتراض البيانات أو التنصت عليها أثناء انتقالها بين جهازك وخوادم الخدمة.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <i className="fas fa-pen-nib text-blue-400"></i>
              <span>6. التعديلات على هذه السياسة</span>
            </h2>
            <p className="text-slate-400">
              نحتفظ بالحق في تعديل أو تحديث هذه السياسة كلما دعت الحاجة لتعزيز الأمان أو لمواكبة التحديثات التقنية. يتم نشر أي تعديل على هذه الصفحة مباشرة مع تحديث تاريخ المراجعة.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
