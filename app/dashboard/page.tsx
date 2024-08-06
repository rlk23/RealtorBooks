"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Content from "@/components/Content";
import ButtonAccount from "@/components/ButtonAccount";
import SEO from "@/components/common/SEO";

export default function Dashboard() {
  const [showSidebar, setShowSidebar] = useState(false);
  
  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <SEO title="Dashboard" slug="" />
      <main className="flex min-h-screen bg-white">
        {/* Sidebar */}
        <Sidebar
          onSidebarHide={handleSidebarToggle}
          showSidebar={showSidebar}
        />

        {/* Main content */}
        <section className={`flex-1 p-8 transition-all duration-300 ${showSidebar ? "ml-64" : "ml-0"}`}>
          <div className="space-y-8">
            <Content onSidebarHide={handleSidebarToggle} />
          </div>
        </section>
      </main>
    </>
  );
}
