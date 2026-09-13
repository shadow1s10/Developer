import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/content';
import { BlogPost } from '../types';

export const BlogView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = ['الكل', 'الأمان الرقمي', 'الخصوصية الرقمية', 'نصائح تقنية', 'مقارنات تقنية'];

  const filteredPosts =
    selectedCategory === 'الكل'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === selectedCategory);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="py-12 sm:py-20 bg-slate-950 min-h-[75vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* If viewing a single article */}
        {activeArticle ? (
          <div className="max-w-4xl mx-auto animate-fadeIn">
            <button
              onClick={() => setActiveArticle(null)}
              className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm font-bold text-slate-300 hover:text-white hover:border-slate-700 transition-all"
            >
              <i className="fas fa-arrow-right"></i>
              <span>العودة لكافة المقالات</span>
            </button>

            <article className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12 text-slate-300">
              <header className="border-b border-slate-800 pb-8 mb-8">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20">
                    {activeArticle.category}
                  </span>
                  <span>•</span>
                  <span><i className="far fa-clock ml-1"></i> {activeArticle.readTime}</span>
                  <span>•</span>
                  <span><i className="far fa-calendar ml-1"></i> {activeArticle.date}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
                  {activeArticle.title}
                </h1>

                <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-medium">
                  {activeArticle.excerpt}
                </p>

                <div className="mt-6 flex items-center justify-between pt-6 border-t border-slate-800/60 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      <i className="fas fa-user-shield text-xs"></i>
                    </div>
                    <span className="font-bold">{activeArticle.author}</span>
                  </div>

                  <button
                    onClick={handleShare}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-all flex items-center gap-1.5"
                  >
                    <i className="fas fa-share-nodes text-xs"></i>
                    <span>{copiedLink ? 'تم نسخ الرابط!' : 'مشاركة'}</span>
                  </button>
                </div>
              </header>

              <div className="space-y-6 text-base sm:text-lg leading-relaxed text-slate-300">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <footer className="mt-12 pt-8 border-t border-slate-800">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-500 font-bold ml-2">وسوم المقال:</span>
                  {activeArticle.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </footer>
            </article>
          </div>
        ) : (
          /* Articles Directory */
          <div>
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
                <i className="fas fa-newspaper text-xs"></i>
                مدونة الأمان والخصوصية الرقمية
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                أحدث المقالات والدراسات حول <span className="text-blue-400">البريد المؤقت</span>
              </h1>
              <p className="mt-4 text-slate-400 text-base leading-relaxed">
                مقالات متخصصة وشاملة لمساعدتك في فهم تقنيات التشفير، مكافحة الرسائل المزعجة (Spam)، وحماية صندوقك الشخصي.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => {
                    setActiveArticle(post);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                      <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <i className="far fa-clock"></i>
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/60"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-500">{post.date}</span>
                      <span className="text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform">
                        <span>قراءة المقال كاملاً</span>
                        <i className="fas fa-arrow-left text-[11px]"></i>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
