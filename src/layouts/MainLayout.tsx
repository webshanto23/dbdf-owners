import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/layout/back-to-top";
import type { SiteData } from "@/types";

interface MainLayoutProps {
  data: SiteData;
  children?: React.ReactNode;
}

export function MainLayout({ data, children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar navLinks={data.navigation} logo={data.association.logo} siteName={data.association.shortName} />
      <main className="flex-1">
        {children || <Outlet />}
      </main>
      <Footer footer={data.footer} navLinks={data.navigation} />
      <BackToTop />
    </div>
  );
}
