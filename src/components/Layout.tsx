
import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { useIsMobile } from "../hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className={`flex-grow ${isMobile ? 'pt-14' : 'pt-16'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
