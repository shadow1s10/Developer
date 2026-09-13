import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/content';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const filteredItems = FAQ_ITEMS.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 sm:py-24 bg-slate-900/60 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
            <i className="fas fa-circle-question text-xs"></i>
            مركز المساعدة والإجابات
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            الأسئلة الشائعة حول <span className="text-blue-400">البريد المؤقت</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            إليك كل ما تحتاج لمعرفته حول طريقة عمل الأداة، الأمان، والخصوصية.
          </p>

          {/* Search bar inside FAQ */}
          <div className="mt-8 max-w-md mx-auto relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث في الأسئلة الشائعة..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pr-11 pl-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
              <i className="fas fa-magnifying-glass"></i>
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
              >
                مسح
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-slate-950/60 border border-slate-800 rounded-3xl p-8">
              <i className="fas fa-circle-exclamation text-3xl text-slate-600 mb-3"></i>
              <p className="text-slate-400 text-sm">لم يتم العثور على نتائج تطابق بحثك.</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-950/80 border border-slate-800/90 rounded-2xl overflow-hidden transition-all hover:border-slate-700"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full text-right px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-slate-200 text-sm sm:text-base leading-snug">
                      {item.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 text-xs shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-blue-400 border-blue-500/30' : ''
                      }`}
                    >
                      <i className="fas fa-chevron-down"></i>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-slate-400 text-sm leading-relaxed border-t border-slate-800/40 animate-fadeIn">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
