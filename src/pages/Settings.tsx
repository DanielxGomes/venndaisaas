import React from 'react';
import { Settings as SettingsIcon, User, Bell, Shield } from 'lucide-react';

export default function Settings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Configurações</h1>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <User className="h-5 w-5 text-gray-500 mr-2" />
            <span className="font-medium">Perfil</span>
          </div>
        </div>
        
        <div className="p-4 border-b">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-gray-500 mr-2" />
            <span className="font-medium">Notificações</span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-gray-500 mr-2" />
            <span className="font-medium">Segurança</span>
          </div>
        </div>
      </div>
    </div>
  );
}