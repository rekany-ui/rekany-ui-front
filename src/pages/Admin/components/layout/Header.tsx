import type { Section } from '@/types';
import { FaBars, FaSyncAlt } from 'react-icons/fa';
import Button from '@/components/ui/Button';

interface HeaderProps {
  currentSection: Section;
  onMenuClick: () => void;
  onRefresh: () => void;
}

export function Header({ currentSection, onMenuClick, onRefresh }: HeaderProps) {
  const titles = {
    dashboard: { title: 'Tableau de bord', subtitle: "Vue d'ensemble du système" },
    contacts: { title: 'Contacts', subtitle: 'Gestion des contacts et messages' },
    produits: { title: 'Produits', subtitle: 'Gestion du catalogue produits' },
  };

  const { title, subtitle } = titles[currentSection];

  return (
    <header className="sticky top-0 z-30 glass-card border-b border-gray-200/60 px-6 py-3.5 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            className="-ml-2 rounded-xl p-2 text-rekany-gray/40 transition-colors hover:bg-rekany-beige hover:text-rekany-dark lg:hidden"
          >
            <FaBars className="text-lg" />
          </button>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-gray-900">{title}</h2>
            <p className="text-sm font-medium text-rekany-gray/60">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-2 rounded-xl bg-rekany-light/20 px-3.5 py-1.5 text-xs font-semibold text-rekany-dark border border-rekany-light/30">
            <span className="status-dot online" />
            API Connectée
          </div>
          <Button
            variant="secondary"
            onClick={onRefresh}
            className="p-2! rounded-xl! w-9! h-9! flex! items-center! justify-center! border-0 hover:bg-rekany-beige! text-rekany-gray/40! hover:text-rekany-dark!"
            title="Rafraîchir"
          >
            <FaSyncAlt className="text-sm" />
          </Button>
        </div>
      </div>
    </header>
  );
}