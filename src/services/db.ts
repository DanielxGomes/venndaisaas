// Simulação de dados para frontend
interface MetricasAgente {
  totalAtendimentos: number;
  atendimentosPorStatus: Array<{
    status: string;
    quantidade: number;
  }>;
  tempoMedioResposta: number;
  taxaSatisfacao: number;
}

const MOCK_DATA: MetricasAgente = {
  totalAtendimentos: 150,
  atendimentosPorStatus: [
    { status: 'em_andamento', quantidade: 25 },
    { status: 'concluido', quantidade: 100 },
    { status: 'pendente', quantidade: 15 },
    { status: 'cancelado', quantidade: 10 }
  ],
  tempoMedioResposta: 300, // 5 minutos em segundos
  taxaSatisfacao: 0.95
};

export async function testarConexao(): Promise<boolean> {
  // Simula delay de conexão
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
}

export async function obterMetricasAgente(): Promise<MetricasAgente> {
  // Simula delay de requisição
  await new Promise(resolve => setTimeout(resolve, 800));
  return MOCK_DATA;
}