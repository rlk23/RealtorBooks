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
          onSidebarHide={() => setShowSidebar(false)}
          showSidebar={showSidebar}
        />

        {/* Main content */}
        <section className={`flex-1 p-8 ${showSidebar ? "ml-64" : "ml-0"} transition-all duration-300`}>
          
          <div className="space-y-8">
            <h1 className="text-3xl md:text-4xl font-extrabold">Private Page</h1>
            <Content onSidebarHide={handleSidebarToggle} />
          </div>
        </section>
      </main>
    </>
  );
}
