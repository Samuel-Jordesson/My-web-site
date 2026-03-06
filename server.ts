import 'dotenv/config'; // no topo de server.ts
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase Client
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

async function startServer() {
  const app = express();
  app.use(express.json());

  // Middleware to track views
  app.use(async (req, res, next) => {
    if (
      req.path.startsWith('/api') || 
      req.path.startsWith('/areadetrabalho') ||
      req.path.includes('.') ||
      req.method !== 'GET'
    ) {
      return next();
    }
    
    try {
      supabase.from('views').insert([{ path: req.path }]).then(({ error }) => {
        if (error && error.code !== '42P01') {
          console.error('Error tracking view:', error.message);
        }
      });
    } catch (e) {
      // Ignore
    }
    next();
  });

  // API Routes
  app.get("/api/projects", async (req, res) => {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        *,
        categories (
          name
        )
      `)
      .order("created_at", { ascending: false });
    
    if (error) return res.status(500).json({ error: error.message });
    
    res.json(data.map((p: any) => ({
      ...p,
      category_name: p.categories?.name,
      technologies: p.technologies || []
    })));
  });

  app.get("/api/projects/:slug", async (req, res) => {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        *,
        categories (
          name
        )
      `)
      .eq("slug", req.params.slug)
      .single();
    
    if (error) {
      if (error.code === "PGRST116") return res.status(404).json({ error: "Projeto não encontrado" });
      return res.status(500).json({ error: error.message });
    }
    
    res.json({
      ...data,
      category_name: data.categories?.name,
      technologies: data.technologies || []
    });
  });

  app.get("/api/projects/id/:id", async (req, res) => {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        *,
        categories (
          name
        )
      `)
      .eq("id", req.params.id)
      .single();
    
    if (error) {
      if (error.code === "PGRST116") return res.status(404).json({ error: "Projeto não encontrado" });
      return res.status(500).json({ error: error.message });
    }
    
    res.json({
      ...data,
      category_name: data.categories?.name,
      technologies: data.technologies || []
    });
  });

  app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  });

  app.post("/api/projects", async (req, res) => {
    const { title, slug, description, content, category_id, technologies, image_url, live_url, github_url, external_link, year, status } = req.body;
    const { data, error } = await supabase
      .from("projects")
      .insert([{ 
        title, slug, description, content, category_id, 
        technologies: technologies || [], 
        image_url, live_url, github_url, external_link, year, status 
      }])
      .select()
      .single();
    
    if (error) return res.status(400).json({ error: error.message });
    res.json({ id: data.id });
  });

  app.put("/api/projects/:id", async (req, res) => {
    const { title, slug, description, content, category_id, technologies, image_url, live_url, github_url, external_link, year, status } = req.body;
    const { error } = await supabase
      .from("projects")
      .update({ 
        title, slug, description, content, category_id, 
        technologies: technologies || [], 
        image_url, live_url, github_url, external_link, year, status 
      })
      .eq("id", req.params.id);
    
    if (error) return res.status(400).json({ error: error.message });
    res.json({ success: true });
  });

  app.delete("/api/projects/:id", async (req, res) => {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", req.params.id);
    
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  });

  app.get("/api/categories", async (req, res) => {
    const { data, error } = await supabase
      .from("categories")
      .select(`
        *,
        projects (
          id
        )
      `);
    
    if (error) return res.status(500).json({ error: error.message });
    
    res.json(data.map((c: any) => ({
      ...c,
      project_count: c.projects?.length || 0
    })));
  });

  app.post("/api/categories", async (req, res) => {
    const { name, slug } = req.body;
    const { data, error } = await supabase
      .from("categories")
      .insert([{ name, slug }])
      .select()
      .single();
    
    if (error) return res.status(400).json({ error: error.message });
    res.json({ id: data.id });
  });

  app.delete("/api/categories/:id", async (req, res) => {
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", req.params.id);
    
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  });

  app.get("/api/messages", async (req, res) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  app.post("/api/messages", async (req, res) => {
    const { name, email, phone, message } = req.body;
    const { data, error } = await supabase
      .from("messages")
      .insert([{ name, email, phone, message }])
      .select()
      .single();
    
    if (error) return res.status(400).json({ error: error.message });
    res.json({ id: data.id });
  });

  app.delete("/api/messages/:id", async (req, res) => {
    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", req.params.id);
    
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  });

  app.get("/api/stats", async (req, res) => {
    try {
      // 1. Total Views
      const { count: totalViewsCount } = await supabase
        .from("views")
        .select("*", { count: "exact", head: true });
        
      // 2. Projects Published
      const { count: projectsCount } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true })
        .eq("status", "published");
        
      // 3. Recent Inquiries
      const { count: messagesCount } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true });

      // 4. Fetch recent activity
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

      const activities: { time: string; text: string; timestamp: string }[] = [];

      recentProjects?.forEach(p => {
        activities.push({
          time: "", 
          text: `Projeto "${p.title}" foi criado/atualizado.`,
          timestamp: p.created_at
        });
      });

      recentMessages?.forEach(m => {
        activities.push({
          time: "", 
          text: `Nova mensagem recebida de ${m.name}.`,
          timestamp: m.created_at
        });
      });

      activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInHours < 1) return "Agora mesmo";
        if (diffInHours < 24) return `${diffInHours} horas atrás`;
        if (diffInDays === 1) return "Ontem";
        return `${diffInDays} dias atrás`;
      };

      const finalActivity = activities.slice(0, 5).map(a => ({
        time: formatTime(a.timestamp),
        text: a.text
      }));

      // 5. Chart Data (Last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { data: viewsData } = await supabase
        .from("views")
        .select("created_at")
        .gte("created_at", thirtyDaysAgo.toISOString());

      // Group by date
      const chartMap = new Map<string, number>();
      // Initialize last 30 days with 0
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
      
      res.json({
        totalViews: totalViewsCount || 0,
        projectsPublished: projectsCount || 0,
        recentInquiries: messagesCount || 0,
        recentActivity: finalActivity.length > 0 ? finalActivity : [
          { time: "Agora", text: "Sistema inicializado com Supabase." }
        ],
        chartData
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Serve uploads statically
  app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
