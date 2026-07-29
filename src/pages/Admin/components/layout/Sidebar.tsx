import type { Section } from '@/types';
import { FaChartPie, FaAddressBook, FaBoxOpen, FaSignOutAlt } from 'react-icons/fa';

interface SidebarProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ currentSection, onSectionChange, isOpen, onClose }: SidebarProps) {
  const navItems = [
    { id: 'dashboard' as Section, label: 'Tableau de bord', icon: FaChartPie },
    { id: 'contacts' as Section, label: 'Contacts', icon: FaAddressBook },
    { id: 'produits' as Section, label: 'Produits', icon: FaBoxOpen },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 z-50 h-full w-64 bg-white border-r border-gray-200/80 shadow-xl transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
    >
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-rekany-dark to-rekany-light flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-rekany-dark/20">
            R
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900 tracking-tight">Rekany Back</h1>
            <p className="text-xs text-rekany-gray/40 font-medium">Administration</p>
          </div>
        </div>
      </div>

      <nav className="p-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              onSectionChange(item.id);
              onClose();
            }}
            className={`sidebar-link flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-all ${currentSection === item.id
              ? 'active bg-linear-to-r from-rekany-dark to-rekany-light text-white shadow-lg shadow-rekany-dark/20'
              : 'text-rekany-gray/60 hover:bg-rekany-beige hover:text-rekany-dark'
              }`}
          >
            <item.icon className={`text-lg ${currentSection === item.id ? 'text-white' : 'text-rekany-gray/40'}`} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100/80 bg-white/60 backdrop-blur-sm">
        <div className="flex items-center gap-3 rounded-xl bg-rekany-beige/50 px-3 py-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-rekany-dark to-rekany-light text-xs font-bold text-white shadow-sm">
            A
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-900">Administrateur</p>
            <p className="truncate text-xs text-rekany-gray/40">admin@rekany.mg</p>
          </div>
          <button
            type="button"
            onClick={() => console.log('Déconnexion')}
            className="text-rekany-gray/40 transition-colors hover:text-red-500"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </aside>
  );
}