import { Routes, Route } from "react-router-dom";
import { useSiteData } from "@/hooks/useSiteData";
import { useSEO } from "@/hooks/useSEO";
import { MainLayout } from "@/layouts/MainLayout";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Committee } from "@/pages/Committee";
import { Members } from "@/pages/Members";
import { Activities } from "@/pages/Activities";
import { Gallery } from "@/pages/Gallery";
import { Documents } from "@/pages/Documents";
import { Contact } from "@/pages/Contact";
import { NotFound } from "@/pages/NotFound";
import { LoadingScreen } from "@/components/common/loading-screen";

function AppContent() {
  const { data, loading, error } = useSiteData();
  useSEO(data);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Unable to load site data</h1>
          <p className="text-neutral-600">{error || "Please try refreshing the page."}</p>
        </div>
      </div>
    );
  }

  return (
    <MainLayout data={data}>
      <Routes>
        <Route path="/" element={<Home home={data.home} />} />
        <Route path="/about" element={<About about={data.about} />} />
        <Route path="/committee" element={<Committee committee={data.committee} />} />
        <Route path="/members" element={<Members members={data.members} />} />
        <Route path="/activities" element={<Activities activities={data.activities} />} />
        <Route path="/gallery" element={<Gallery gallery={data.gallery} />} />
        <Route path="/documents" element={<Documents documents={data.documents} />} />
        <Route path="/contact" element={<Contact contact={data.contact} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default function App() {
  return <AppContent />;
}
