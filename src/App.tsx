import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer } from './components/Layout';
import { AdminSidebar } from './components/AdminSidebar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Dashboard from './pages/admin/Dashboard';
import ProjectList from './pages/admin/ProjectList';
import ProjectEditor from './pages/admin/ProjectEditor';
import Login from './pages/admin/Login';
import { AuthGuard } from './components/AuthGuard';
import { api } from './services/api';

import Categories from './pages/admin/Categories';

import Contact from './pages/Contact';
import Curriculo from './pages/Curriculo';
import Messages from './pages/admin/Messages';
import NotFound from './pages/NotFound';

const ViewTracker = () => {
  const location = useLocation();
  
  React.useEffect(() => {
    api.stats.trackView(location.pathname);
  }, [location.pathname]);
  
  return null;
};

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen bg-black text-white">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen bg-black text-white">
    <AdminSidebar />
    <main className="flex-1 md:ml-64 p-6 md:p-12 lg:p-20 overflow-y-auto bg-black">{children}</main>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ViewTracker />
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/projects" element={<PublicLayout><Projects /></PublicLayout>} />
        <Route path="/projects/:slug" element={<PublicLayout><ProjectDetail /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/curriculo" element={<PublicLayout><Curriculo /></PublicLayout>} />
        <Route path="/login" element={<Login />} />

        {/* Rotas Admin */}
        <Route path="/areadetrabalho" element={<AuthGuard><AdminLayout><Dashboard /></AdminLayout></AuthGuard>} />
        <Route path="/areadetrabalho/projects" element={<AuthGuard><AdminLayout><ProjectList /></AdminLayout></AuthGuard>} />
        <Route path="/areadetrabalho/projects/new" element={<AuthGuard><AdminLayout><ProjectEditor /></AdminLayout></AuthGuard>} />
        <Route path="/areadetrabalho/projects/edit/:id" element={<AuthGuard><AdminLayout><ProjectEditor /></AdminLayout></AuthGuard>} />
        <Route path="/areadetrabalho/categories" element={<AuthGuard><AdminLayout><Categories /></AdminLayout></AuthGuard>} />
        <Route path="/areadetrabalho/messages" element={<AuthGuard><AdminLayout><Messages /></AdminLayout></AuthGuard>} />
        <Route path="/areadetrabalho/settings" element={<AuthGuard><AdminLayout><div className="text-white">Configurações (Em breve)</div></AdminLayout></AuthGuard>} />
        
        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
