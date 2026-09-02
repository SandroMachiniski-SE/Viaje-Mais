export interface PontoResumo {
  id: number;
  nome: string;
  descricao: string | null;
  categoria: string;
  cidade: string;
  endereco: string | null;
  faixaPreco: string | null;
  acessibilidade: string | null;
  siteOficial: string | null;
  telefoneContato: string | null;
  seloVerificado: boolean;
}

export interface ItemRoteiro {
  id: number;
  idRoteiro: number;
  idPonto: number;
  ordem: number;
  observacao: string | null;
  dataCriacao: string;
  ponto: PontoResumo;
}

export interface Roteiro {
  id: number;
  nome: string;
  descricao: string | null;
  cidade: string;
  dataInicio: string | null;
  dataFim: string | null;
  idUsuario: number;
  dataCriacao: string;
  dataAtualizacao: string;
  itens: ItemRoteiro[];
}

export interface RespostaRoteiros {
  total: number;
  dados: Roteiro[];
}
