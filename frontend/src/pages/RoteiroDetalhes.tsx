import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import type { Roteiro } from "../types/roteiro";

function RoteiroDetalhes() {
  const { id } = useParams();
  const [roteiro, setRoteiro] = useState<Roteiro | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function buscarRoteiro() {
      try {
        setCarregando(true);
        setErro(null);

        const resposta = await api.get<Roteiro>(`/roteiros/${id}`);
        setRoteiro(resposta.data);
      } catch (err) {
        console.error(err);
        setErro("Nao foi possivel carregar este roteiro.");
      } finally {
        setCarregando(false);
      }
    }

    buscarRoteiro();
  }, [id]);

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

          <div style={{ display: "grid", gap: "1rem" }}>
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
        </div>
      )}
    </div>
  );
}

export default RoteiroDetalhes;
