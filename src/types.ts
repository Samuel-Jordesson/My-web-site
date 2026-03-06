export interface Category {
  id: number;
  name: string;
  slug: string;
  project_count?: number;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  category_id: number;
  category_name?: string;
  technologies: string[];
  image_url: string;
  live_url: string;
  github_url: string;
  external_link: string;
  year: string;
  status: 'published' | 'draft';
  created_at: string;
}

export interface Stats {
  totalViews: number;
  projectsPublished: number;
  recentInquiries: number;
  recentActivity: { time: string; text: string }[];
  chartData: { date: string; count: number }[];
}

export interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}
