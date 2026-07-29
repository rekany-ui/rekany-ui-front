import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import type { Section } from '@/types';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentSection: Section;
  onSectionChange: (section: Section) => void;
  onRefresh: () => void;
}

export function AdminLayout({ children, currentSection, onSectionChange, onRefresh }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-rekany-beige text-rekany-gray">
      <Sidebar
        currentSection={currentSection}
        onSectionChange={onSectionChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        onClick={() => setSidebarOpen(false)}
      />

      <main className="lg:ml-64 min-h-screen">
        <Header
          currentSection={currentSection}
          onMenuClick={() => setSidebarOpen(true)}
          onRefresh={onRefresh}
        />
        <div className="p-6 space-y-6">{children}</div>
      </main>
    </div>
  );
}