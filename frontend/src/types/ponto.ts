export interface Ponto {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  cidade: string;
  endereco: string;
  latitude: number;
  longitude: number;
  faixaPreco: string;
  acessibilidade: string;
  siteOficial: string | null;
  telefoneContato: string | null;
  status: string;
  seloVerificado: boolean;
}

export interface RespostaPontos {
  total: number;
  dados: Ponto[];
}