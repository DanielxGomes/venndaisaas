import React from 'react';
import { Bot } from 'lucide-react';

export default function Agent() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Agente Virtual</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-6">
          <Bot className="h-8 w-8 text-blue-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Configuração do Agente</h2>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            Configure seu agente virtual para atendimento automatizado.
          </p>
          
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Iniciar Configuração
          </button>
        </div>
      </div>
    </div>
  );
}