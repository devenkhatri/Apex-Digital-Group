
import type { Service, CaseStudy, Testimonial, TeamMember, BlogPost, ClientMetric } from '@/types';
import { BarChart3, Bot, Code2, ShieldCheck, Users, TrendingUp, CheckCircle, Award } from 'lucide-react';

export const services: Service[] = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    slug: '/services/digital-marketing',
    briefDescription: 'Drive growth with data-driven digital marketing strategies.',
    description: 'Comprehensive digital marketing services including SEO, SEM, social media, content marketing, and PPC campaigns to boost your online presence and achieve measurable results.',
    icon: BarChart3,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'marketing analytics',
    subServices: [
      { name: 'SEO/SEM', description: 'Optimize your search engine ranking and visibility.' },
      { name: 'Social Media Management', description: 'Engage your audience and build your brand on social platforms.' },
      { name: 'Content Marketing', description: 'Create valuable content that attracts and converts.' },
      { name: 'PPC Campaigns', description: 'Run targeted ad campaigns for immediate impact.' },
    ],
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    slug: '/services/ai-automation',
    briefDescription: 'Leverage AI to automate processes and gain intelligent insights.',
    description: 'Integrate artificial intelligence and automation into your business operations for enhanced efficiency, decision-making, and innovation. We offer process automation, AI integration, machine learning solutions, and data analytics.',
    icon: Bot,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'artificial intelligence',
    subServices: [
      { name: 'Process Automation', description: 'Streamline repetitive tasks and improve workflows.' },
      { name: 'AI Integration', description: 'Embed AI capabilities into your existing systems.' },
      { name: 'Machine Learning Solutions', description: 'Develop custom ML models for predictive analytics.' },
      { name: 'Data Analytics', description: 'Unlock insights from your data to drive business strategy.' },
    ],
  },
  {
    id: 'web-development',
    title: 'Web Development',
    slug: '/services/web-development',
    briefDescription: 'Crafting exceptional web and mobile experiences.',
    description: 'From custom websites to complex e-commerce platforms and mobile apps, our web development services focus on user-centric design and cutting-edge technology to deliver seamless digital experiences.',
    icon: Code2,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'web design',
    subServices: [
      { name: 'Custom Website Development', description: 'Tailor-made websites that reflect your brand and goals.' },
      { name: 'E-commerce Solutions', description: 'Build robust online stores that drive sales.' },
      { name: 'Mobile Apps', description: 'Develop engaging mobile applications for iOS and Android.' },
      { name: 'UI/UX Design', description: 'Create intuitive and visually appealing user interfaces.' },
    ],
  },
  {
    id: 'it-implementation',
    title: 'IT Implementation',
    slug: '/services/it-implementation',
    briefDescription: 'Robust IT solutions for modern enterprises.',
    description: 'Implementing scalable and secure IT infrastructure, enterprise software solutions, cloud migration strategies, and cybersecurity measures to support your business growth and protect your assets.',
    icon: ShieldCheck,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'server security',
    subServices: [
      { name: 'Enterprise Software Solutions', description: 'Deploy and integrate powerful enterprise software.' },
      { name: 'Cloud Migration', description: 'Seamlessly transition your IT infrastructure to the cloud.' },
      { name: 'IT Infrastructure', description: 'Design and manage resilient IT systems.' },
      { name: 'Cybersecurity', description: 'Protect your digital assets with advanced security measures.' },
    ],
  },
];

export const clientMetrics: ClientMetric[] = [
  { id: '1', value: '150%', label: 'Increase in Client ROI', icon: TrendingUp },
  { id: '2', value: '50+', label: 'Successful Projects Delivered', icon: CheckCircle },
  { id: '3', value: '98%', label: 'Client Satisfaction Rate', icon: Award },
  { id: '4', value: '10K+', label: 'Leads Generated Monthly', icon: Users },
];

export const featuredCaseStudies: CaseStudy[] = [
  {
    id: 'case-study-1',
    title: 'Boosting E-commerce Sales by 200% for DigiBharat Electronics',
    slug: '/portfolio/digibharat-ecommerce-boost',
    clientName: 'DigiBharat Electronics',
    problem: 'Stagnant online sales and low conversion rates in the Indian market.',
    solution: 'Implemented a comprehensive digital marketing strategy, including targeted PPC campaigns for Indian audiences, regional SEO optimization, and a revamped e-commerce user experience reflecting local preferences.',
    results: ['200% increase in online sales within 6 months.', '50% improvement in conversion rates.', 'Significant growth in organic traffic from key Indian cities.'],
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'ecommerce success india',
    serviceCategory: 'Digital Marketing',
  },
  {
    id: 'case-study-2',
    title: 'Automating Customer Support with AI for PaisaGrowth Fintech',
    slug: '/portfolio/paisagrowth-ai-support',
    clientName: 'PaisaGrowth Fintech',
    problem: 'High volume of customer inquiries in multiple Indian languages leading to slow response times and increased operational costs.',
    solution: 'Developed and integrated an AI-powered chatbot supporting English and Hindi, alongside an automated ticketing system to handle common queries and streamline support workflows.',
    results: ['40% reduction in customer support response time.', '30% decrease in support operational costs.', 'Improved customer satisfaction scores across diverse user segments.'],
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'ai customer service india',
    serviceCategory: 'AI & Automation',
  },
];

export const portfolioProjects: PortfolioProject[] = [
  ...featuredCaseStudies,
  {
    id: 'project-3',
    title: 'Custom CRM Development for Vahaan Logistics',
    slug: '/portfolio/vahaanlogistics-crm',
    clientName: 'Vahaan Logistics',
    problem: 'Inefficient customer relationship management due to outdated and disparate systems for their pan-India operations.',
    solution: 'Designed and developed a bespoke CRM platform tailored to their specific logistics workflows, integrating all customer data into a unified system with regional dashboards.',
    results: ['Improved operational efficiency by 25%.', 'Enhanced data accuracy and accessibility for regional teams.', 'Better customer segmentation and targeted marketing capabilities across India.'],
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'crm development india',
    serviceCategory: 'Web Development',
  },
  {
    id: 'project-4',
    title: 'Cloud Migration and Infrastructure Overhaul for Swasthya Connect',
    slug: '/portfolio/swasthyaconnect-cloud',
    clientName: 'Swasthya Connect',
    problem: 'Scalability limitations and high maintenance costs with on-premise IT infrastructure for their growing healthcare platform in India.',
    solution: 'Executed a full cloud migration to a local AWS region, modernizing their infrastructure for better scalability, security, and cost-effectiveness, while ensuring data sovereignty.',
    results: ['Reduced IT infrastructure costs by 35%.', 'Achieved 99.99% uptime for users across India.', 'Enhanced data security and compliance with Indian healthcare regulations.'],
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'cloud migration india',
    serviceCategory: 'IT Implementation',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: "Apex Digital Group completely transformed our online presence. Their understanding of the Indian digital market is truly top-notch, and we've seen fantastic growth since partnering with them. Bahut badhiya kaam (Very good work)!",
    clientName: 'Priya Sharma',
    clientTitle: 'CEO',
    clientCompany: 'Indus Innovate Solutions',
    clientLogoUrl: 'https://placehold.co/150x50.png?text=IndusInnovate',
    dataAiHint: 'indian company logo',
  },
  {
    id: 'testimonial-2',
    quote: "The AI automation solution from Apex has made our operations so much smoother, saving us considerable time and resources. We are very happy with their work and their support for our team in Bangalore. Highly recommended!",
    clientName: 'Rohan Mehra',
    clientTitle: 'COO',
    clientCompany: 'Gyan AI Systems',
    clientLogoUrl: 'https://placehold.co/150x50.png?text=GyanAI',
    dataAiHint: 'indian tech logo',
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Ananya Sharma',
    role: 'Lead Digital Strategist',
    bio: 'Ananya has over 10 years of experience in crafting and executing successful digital marketing campaigns for diverse clients across India.',
    imageUrl: 'https://placehold.co/300x300.png',
    dataAiHint: 'indian professional woman',
    socialLinks: [{ platform: 'linkedin', url: '#' }],
  },
  {
    id: 'team-2',
    name: 'Vikram Singh',
    role: 'Head of AI Development',
    bio: 'Vikram is a visionary in AI and machine learning, dedicated to developing innovative solutions that drive business value for Indian enterprises.',
    imageUrl: 'https://placehold.co/300x300.png',
    dataAiHint: 'indian technology expert man',
    socialLinks: [{ platform: 'linkedin', url: '#' }, { platform: 'twitter', url: '#' }],
  },
  {
    id: 'team-3',
    name: 'Divya Reddy',
    role: 'Senior Web Architect',
    bio: 'Divya specializes in building scalable and performant web applications with a focus on user experience and modern technologies for the Indian market.',
    imageUrl: 'https://placehold.co/300x300.png',
    dataAiHint: 'indian developer woman',
    socialLinks: [{ platform: 'linkedin', url: '#' }],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Future of SEO: Trends to Watch in India for 2024',
    slug: '/blog/future-of-seo-india-2024',
    excerpt: 'Stay ahead of the curve with our insights into the latest SEO trends that will shape digital marketing for businesses in India this coming year.',
    content: 'Detailed content about SEO trends relevant to the Indian market, including vernacular SEO and mobile-first indexing emphasis...',
    author: 'Ananya Sharma',
    publishDate: '2024-07-15',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'seo analytics india',
    category: 'Digital Marketing',
  },
  {
    id: 'blog-2',
    title: 'How AI is Revolutionizing MSMEs in India',
    slug: '/blog/ai-for-indian-msmes',
    excerpt: 'Discover practical ways artificial intelligence can empower Micro, Small & Medium Enterprises (MSMEs) in India to compete and thrive.',
    content: 'Detailed content about AI applications for Indian MSMEs, government initiatives, and local success stories...',
    author: 'Vikram Singh',
    publishDate: '2024-07-10',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'ai business india',
    category: 'AI & Automation',
  },
];
