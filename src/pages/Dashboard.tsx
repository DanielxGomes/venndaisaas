import { useEffect, useState } from 'react';
import { BarChart3, Users, Clock, ThumbsUp, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { testarConexao, obterMetricasAgente } from '../services/db';

interface Metricas {
  totalAtendimentos: number;
  atendimentosPorStatus: Array<{
    status: string;
    quantidade: number;
  }>;
  tempoMedioResposta: number;
  taxaSatisfacao: number;
}

export default function Dashboard() {
  const [metricas, setMetricas] = useState<Metricas | null>(null);
  const [statusConexao, setStatusConexao] = useState<boolean | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function inicializar() {
      try {
        // Testa a conexão com o banco
        const conexaoOk = await testarConexao();
        setStatusConexao(conexaoOk);

        if (conexaoOk) {
          // Carrega as métricas
          const dadosMetricas = await obterMetricasAgente();
          setMetricas(dadosMetricas);
        }
      } catch (erro) {
        console.error('Erro ao carregar dashboard:', erro);
        setErro('Não foi possível carregar os dados do dashboard');
      } finally {
        setCarregando(false);
      }
    }

    inicializar();
  }, []);

  if (carregando) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-vennd-primary" />
      </div>
    );
  }

  if (erro) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>{erro}</p>
        <p className="mt-2 text-sm">Status da conexão: {statusConexao ? 'Conectado' : 'Desconectado'}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Painel de Controle</h1>
        <div className="flex items-center">
          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
            statusConexao ? 'bg-green-500' : 'bg-red-500'
          }`}></span>
          <span className="text-sm text-gray-600">
            {statusConexao ? 'Conectado ao banco' : 'Desconectado'}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total de Atendimentos</p>
              <p className="text-2xl font-semibold text-gray-900">
                {metricas?.totalAtendimentos || 0}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Atendimentos em Andamento</p>
              <p className="text-2xl font-semibold text-gray-900">
                {metricas?.atendimentosPorStatus.find(s => s.status === 'em_andamento')?.quantidade || 0}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tempo Médio de Resposta</p>
              <p className="text-2xl font-semibold text-gray-900">
                {metricas?.tempoMedioResposta 
                  ? `${Math.round(metricas.tempoMedioResposta / 60)} min` 
                  : 'N/A'}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ThumbsUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Taxa de Satisfação</p>
              <p className="text-2xl font-semibold text-gray-900">
                {metricas?.taxaSatisfacao 
                  ? `${Math.round(metricas.taxaSatisfacao * 100)}%` 
                  : 'N/A'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {metricas?.atendimentosPorStatus && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-6 bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Distribuição de Status
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metricas.atendimentosPorStatus.map((status) => (
              <div key={status.status} className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-600">
                  {status.status.replace('_', ' ').toUpperCase()}
                </p>
                <p className="text-xl font-semibold text-gray-900">
                  {status.quantidade}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}