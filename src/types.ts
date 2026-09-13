export type PageTab = 'home' | 'about' | 'privacy' | 'terms' | 'blog' | 'faq';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  readTime: string;
  date: string;
  author: string;
  tags: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  badge?: string;
}
