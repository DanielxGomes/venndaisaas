import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Bot, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/agent', icon: Bot, label: 'Agente' },
    { path: '/settings', icon: SettingsIcon, label: 'Configurações' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">Vennd</h1>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              location.pathname === item.path ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 w-64 p-6">
        <button
          onClick={logout}
          className="flex items-center text-gray-700 hover:text-red-600"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}