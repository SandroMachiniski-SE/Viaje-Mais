export interface Ponto {
  id: number;
  nome: string;
  descricao: string | null;
  categoria: string;
  cidade: string;
  endereco: string | null;
  latitude: number | null;
  longitude: number | null;
  faixaPreco: string | null;
  acessibilidade: string | null;
  siteOficial: string | null;
  telefoneContato: string | null;
  status: string;
  seloVerificado: boolean;
}

export interface RespostaPontos {
  total: number;
  dados: Ponto[];
}
