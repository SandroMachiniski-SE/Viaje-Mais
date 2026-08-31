export interface ItemRoteiro {
  id: number;
  idRoteiro: number;
  idPonto: number;
  ordem: number;
  observacao: string | null;
}

export interface Roteiro {
  id: number;
  nome: string;
  descricao: string | null;
  cidade: string;
  dataInicio: string | null;
  dataFim: string | null;
  idUsuario: number;
  itens?: ItemRoteiro[];
}

export interface RespostaRoteiros {
  total: number;
  dados: Roteiro[];
}
