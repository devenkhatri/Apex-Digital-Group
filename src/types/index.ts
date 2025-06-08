import type { LucideIcon } from 'lucide-react';

export interface NavItemType {
  label: string;
  href: string;
  children?: NavItemType[];
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  briefDescription: string;
  icon?: LucideIcon;
  imageUrl?: string;
  subServices?: { name: string; description: string }[];
  dataAiHint?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  problem: string;
  solution: string;
  results: string[];
  imageUrl: string;
  serviceCategory: string;
  dataAiHint?: string;
}

export interface Testimonial {
  id:string;
  quote: string;
  clientName: string;
  clientTitle: string;
  clientCompany: string;
  clientLogoUrl?: string;
  dataAiHint?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  socialLinks?: { platform: string; url: string }[];
  dataAiHint?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // This could be markdown or HTML
  author: string;
  publishDate: string; // Consider using Date type
  imageUrl: string;
  category: string;
  dataAiHint?: string;
}

export interface PortfolioProject extends CaseStudy {}

export interface ClientMetric {
  id: string;
  value: string;
  label: string;
  icon?: LucideIcon;
}
