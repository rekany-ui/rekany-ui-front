import type { Contact, Product } from '@/types';
import { FaAddressBook, FaBoxOpen, FaEnvelope, FaCheckCircle } from 'react-icons/fa';

interface DashboardStatsProps {
  contacts: Contact[];
  products: Product[];
}

export function DashboardStats({ contacts, products }: DashboardStatsProps) {
  const stats = [
    {
      label: 'Contacts',
      value: contacts.length,
      icon: FaAddressBook,
      color: 'rekany-dark',
      bgColor: 'bg-rekany-dark/10',
      subtext: 'Total',
    },
    {
      label: 'Produits',
      value: products.length,
      icon: FaBoxOpen,
      color: 'rekany-light',
      bgColor: 'bg-rekany-light/20',
      subtext: 'Total',
    },
    {
      label: 'Messages non lus',
      value: contacts.filter((c) => !c.lu).length,
      icon: FaEnvelope,
      color: 'rekany-fair',
      bgColor: 'bg-rekany-fair/20',
      subtext: 'Non lus',
    },
    {
      label: 'Produits disponibles',
      value: products.filter((p) => p.available).length,
      icon: FaCheckCircle,
      color: 'rekany-marang',
      bgColor: 'bg-rekany-marang/20',
      subtext: 'Dispo',
    },
  ];

  const colorClasses = {
    'rekany-dark': 'bg-rekany-dark/10 text-rekany-dark',
    'rekany-light': 'bg-rekany-light/20 text-rekany-dark',
    'rekany-fair': 'bg-rekany-fair/20 text-rekany-fair',
    'rekany-marang': 'bg-rekany-marang/20 text-rekany-marang',
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="card p-5 hover:shadow-lg transition-shadow duration-300">
          <div className="mb-3 flex items-center justify-between">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
              <stat.icon className="text-lg" />
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${stat.bgColor} ${stat.color === 'rekany-dark' ? 'text-rekany-dark' : ''} ${stat.color === 'rekany-light' ? 'text-rekany-dark' : ''} ${stat.color === 'rekany-fair' ? 'text-rekany-fair' : ''} ${stat.color === 'rekany-marang' ? 'text-rekany-marang' : ''}`}>
              {stat.subtext}
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900">{stat.value}</h3>
          <p className="mt-0.5 text-sm font-medium text-rekany-gray/60">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}