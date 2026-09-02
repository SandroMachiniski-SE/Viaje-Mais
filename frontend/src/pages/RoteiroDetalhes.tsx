import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import type { Roteiro } from "../types/roteiro";
import type { Ponto, RespostaPontos } from "../types/ponto";

function RoteiroDetalhes() {
  const { id } = useParams();

  const [roteiro, setRoteiro] = useState<Roteiro | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [pontosDisponiveis, setPontosDisponiveis] = useState<Ponto[]>([]);
  const [idPontoSelecionado, setIdPontoSelecionado] = useState("");
  const [ordem, setOrdem] = useState("");
  const [observacao, setObservacao] = useState("");
  const [enviandoPonto, setEnviandoPonto] = useState(false);
  const [erroPonto, setErroPonto] = useState<string | null>(null);

  async function buscarRoteiro() {
    try {
      setCarregando(true);
      setErro(null);

      const resposta = await api.get<Roteiro>(`/roteiros/${id}`);
      setRoteiro(resposta.data);

      setOrdem(String(resposta.data.itens.length + 1));
    } catch (err) {
      console.error(err);
      setErro("Nao foi possivel carregar este roteiro.");
    } finally {
      setCarregando(false);
    }
  }

  async function buscarPontos() {
    try {
      const resposta = await api.get<RespostaPontos>("/pontos");
      setPontosDisponiveis(resposta.data.dados);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    buscarRoteiro();
    buscarPontos();
  }, [id]);

  async function aoAdicionarPonto(evento: React.FormEvent) {
    evento.preventDefault();
    setErroPonto(null);

    if (!idPontoSelecionado) {
      setErroPonto("Selecione um ponto para adicionar.");
      return;
    }

    try {
      setEnviandoPonto(true);

      const payload: Record<string, unknown> = {
        idPonto: Number(idPontoSelecionado),
      };

      if (ordem.trim() !== "") {
        payload.ordem = Number(ordem);
      }

      if (observacao.trim() !== "") {
        payload.observacao = observacao.trim();
      }

      await api.post(`/roteiros/${id}/itens`, payload);

      setIdPontoSelecionado("");
      setObservacao("");

      await buscarRoteiro();
    } catch (err: unknown) {
      console.error(err);

      let mensagem = "Nao foi possivel adicionar este ponto ao roteiro.";

      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as any).response?.data?.erro === "string"
      ) {
        mensagem = (err as any).response.data.erro;
      }

      setErroPonto(mensagem);
    } finally {
      setEnviandoPonto(false);
    }
  }

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "2rem 1rem" }}>
      <Link to="/roteiros" style={{ color: "#2563eb", textDecoration: "none" }}>
        Voltar para meus roteiros
      </Link>

      {carregando && <p>Carregando roteiro...</p>}

      {erro && (
        <div
          style={{
            border: "1px solid #f87171",
            backgroundColor: "#fee2e2",
            color: "#991b1b",
            borderRadius: 8,
            padding: "1rem",
            marginTop: "1rem",
          }}
        >
          {erro}
        </div>
      )}

      {!carregando && !erro && roteiro && (
        <div style={{ marginTop: "1rem" }}>
          <h1 style={{ marginBottom: 0 }}>{roteiro.nome}</h1>
          <p style={{ color: "#666", marginTop: "0.25rem" }}>{roteiro.cidade}</p>

          {roteiro.descricao && <p>{roteiro.descricao}</p>}

          <h2 style={{ marginTop: "2rem" }}>Pontos do roteiro</h2>

          {roteiro.itens.length === 0 && (
            <p>Este roteiro ainda nao tem pontos cadastrados.</p>
          )}

          <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
            {roteiro.itens
              .sort((a, b) => a.ordem - b.ordem)
              .map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    padding: "1.5rem",
                  }}
                >
                  <p style={{ margin: 0, color: "#666", fontSize: "0.85rem" }}>
                    Parada {item.ordem}
                  </p>
                  <h3 style={{ margin: "0.25rem 0" }}>{item.ponto.nome}</h3>
                  <p style={{ margin: 0, color: "#666" }}>{item.ponto.categoria}</p>

                  {item.observacao && (
                    <p style={{ margin: "0.5rem 0 0" }}>{item.observacao}</p>
                  )}
                </div>
              ))}
          </div>

          <h2>Adicionar ponto ao roteiro</h2>

          <form
            onSubmit={aoAdicionarPonto}
            style={{
              display: "grid",
              gap: "1rem",
              maxWidth: 480,
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: "1.5rem",
            }}
          >
            <label style={{ display: "grid", gap: "0.25rem" }}>
              Ponto turistico *
              <select
                value={idPontoSelecionado}
                onChange={(e) => setIdPontoSelecionado(e.target.value)}
                style={{ padding: "0.5rem", borderRadius: 6, border: "1px solid #ccc" }}
              >
                <option value="">Selecione um ponto</option>
                {pontosDisponiveis.map((ponto) => (
                  <option key={ponto.id} value={ponto.id}>
                    {ponto.nome} - {ponto.cidade}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ display: "grid", gap: "0.25rem" }}>
              Ordem
              <input
                type="number"
                min={0}
                value={ordem}
                onChange={(e) => setOrdem(e.target.value)}
                style={{ padding: "0.5rem", borderRadius: 6, border: "1px solid #ccc" }}
              />
            </label>

            <label style={{ display: "grid", gap: "0.25rem" }}>
              Observacao
              <input
                type="text"
                maxLength={500}
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                style={{ padding: "0.5rem", borderRadius: 6, border: "1px solid #ccc" }}
              />
            </label>

            {erroPonto && (
              <div
                style={{
                  border: "1px solid #f87171",
                  backgroundColor: "#fee2e2",
                  color: "#991b1b",
                  borderRadius: 8,
                  padding: "1rem",
                }}
              >
                {erroPonto}
              </div>
            )}

            <button
              type="submit"
              disabled={enviandoPonto}
              style={{
                padding: "0.75rem",
                borderRadius: 6,
                border: "none",
                backgroundColor: "#2563eb",
                color: "#fff",
                fontWeight: "bold",
                cursor: enviandoPonto ? "not-allowed" : "pointer",
              }}
            >
              {enviandoPonto ? "Adicionando..." : "Adicionar ponto"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default RoteiroDetalhes;
