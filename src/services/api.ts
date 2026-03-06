import { Category, Project, Stats, Message } from "../types";
import { supabase } from "../lib/supabase";

export const api = {
  projects: {
    getAll: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          categories (
            name
          )
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      return data.map((p: any) => ({
        ...p,
        category_name: p.categories?.name,
        technologies: p.technologies || []
      })) as Project[];
    },
    getOne: async (slug: string) => {
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          categories (
            name
          )
        `)
        .eq("slug", slug)
        .single();
      
      if (error) throw error;
      
      return {
        ...data,
        category_name: data.categories?.name,
        technologies: data.technologies || []
      } as Project;
    },
    getById: async (id: number) => {
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          categories (
            name
          )
        `)
        .eq("id", id)
        .single();
      
      if (error) throw error;
      
      return {
        ...data,
        category_name: data.categories?.name,
        technologies: data.technologies || []
      } as Project;
    },
    create: async (data: Partial<Project>) => {
      const { data: created, error } = await supabase
        .from("projects")
        .insert([data])
        .select()
        .single();
      
      if (error) throw error;
      return created;
    },
    update: async (id: number, data: Partial<Project>) => {
      const { error } = await supabase
        .from("projects")
        .update(data)
        .eq("id", id);
      
      if (error) throw error;
      return { success: true };
    },
    delete: async (id: number) => {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      return { success: true };
    },
    upload: async (file: File) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath);

      return { imageUrl: data.publicUrl };
    },
  },
  categories: {
    getAll: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select(`
          *,
          projects (
            id
          )
        `);
      
      if (error) throw error;
      
      return data.map((c: any) => ({
        ...c,
        project_count: c.projects?.length || 0
      })) as Category[];
    },
    create: async (data: { name: string; slug: string }) => {
      const { data: created, error } = await supabase
        .from("categories")
        .insert([data])
        .select()
        .single();
      
      if (error) throw error;
      return created;
    },
    delete: async (id: number) => {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      return { success: true };
    },
  },
  messages: {
    getAll: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Message[];
    },
    create: async (data: Partial<Message>) => {
      const { data: created, error } = await supabase
        .from("messages")
        .insert([data])
        .select()
        .single();
      
      if (error) throw error;
      return created;
    },
    delete: async (id: number) => {
      const { error } = await supabase
        .from("messages")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      return { success: true };
    },
  },
  stats: {
    get: async (): Promise<Stats> => {
      // Total Views
      const { count: totalViews } = await supabase
        .from("views")
        .select("*", { count: "exact", head: true });
        
      // Projects Published
      const { count: projectsPublished } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true })
        .eq("status", "published");
        
      // Recent Inquiries
      const { count: recentInquiries } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true });

      // Recent activity
      const { data: recentProjects } = await supabase
        .from("projects")
        .select("title, created_at")
        .order("created_at", { ascending: false })
        .limit(3);

      const { data: recentMessages } = await supabase
        .from("messages")
        .select("name, created_at")
        .order("created_at", { ascending: false })
        .limit(2);

      const activities: any[] = [];
      recentProjects?.forEach(p => activities.push({ text: `Projeto "${p.title}" criado/atualizado.`, timestamp: p.created_at }));
      recentMessages?.forEach(m => activities.push({ text: `Nova mensagem de ${m.name}.`, timestamp: m.created_at }));
      activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        if (hours < 1) return "Agora";
        if (hours < 24) return `${hours}h atrás`;
        return `${Math.floor(hours/24)}d atrás`;
      };

      // Chart Data (Last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { data: viewsData } = await supabase
        .from("views")
        .select("created_at")
        .gte("created_at", thirtyDaysAgo.toISOString());

      const chartMap = new Map<string, number>();
      for (let i = 0; i < 30; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        chartMap.set(d.toISOString().split('T')[0], 0);
      }

      viewsData?.forEach(v => {
        const date = v.created_at.split('T')[0];
        if (chartMap.has(date)) {
          chartMap.set(date, (chartMap.get(date) || 0) + 1);
        }
      });

      const chartData = Array.from(chartMap.entries())
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date));

      return {
        totalViews: totalViews || 0,
        projectsPublished: projectsPublished || 0,
        recentInquiries: recentInquiries || 0,
        recentActivity: activities.slice(0, 5).map(a => ({ time: formatTime(a.timestamp), text: a.text })),
        chartData
      };
    },
    trackView: async (path: string) => {
      // Don't track admin paths or assets
      if (path.startsWith('/areadetrabalho') || path.includes('.')) return;
      
      try {
        await supabase.from('views').insert([{ path }]);
      } catch (e) {
        // Ignore errors
      }
    }
  }
};
