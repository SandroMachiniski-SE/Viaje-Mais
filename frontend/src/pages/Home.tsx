import { useState, type FormEvent } from "react";
import api from "../services/api";
import type { Ponto, RespostaPontos } from "../types/ponto";
import { Link } from "react-router-dom";

function Home() {
  const [cidade, setCidade] = useState("");
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [buscou, setBuscou] = useState(false);

  async function buscarPontos(event: FormEvent) {
    event.preventDefault();

    setCarregando(true);
    setErro(null);
    setBuscou(true);

    try {
      const resposta = await api.get<RespostaPontos>("/pontos", {
        params: cidade.trim() ? { cidade: cidade.trim() } : {},
      });

      setPontos(resposta.data.dados);
    } catch (error) {
      console.error("Erro ao buscar pontos turísticos:", error);
      setErro("Não foi possível carregar os pontos turísticos. Tente novamente.");
      setPontos([]);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1>NomadPlan</h1>
      <p>Descubra pontos turísticos e monte seu roteiro personalizado.</p>

      <form onSubmit={buscarPontos} style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
        <input
          type="text"
          value={cidade}
          onChange={(event) => setCidade(event.target.value)}
          placeholder="Para onde você quer NomadPlanr?"
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button type="submit" disabled={carregando}>
          {carregando ? "Buscando..." : "Explorar cidade"}
        </button>
      </form>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {!erro && buscou && !carregando && pontos.length === 0 && (
        <p>Nenhum ponto turístico encontrado.</p>
      )}

      <div style={{ display: "grid", gap: "1rem" }}>
        {pontos.map((ponto) => (
          <Link
            key={ponto.id}
            to={`/pontos/${ponto.id}`}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: "1rem",
              textDecoration: "none",
              color: "inherit",
              display: "block",
            }}
          >
            <h2 style={{ margin: "0 0 0.25rem" }}>{ponto.nome}</h2>
            <p style={{ margin: "0 0 0.5rem", color: "#555" }}>
              {ponto.categoria} • {ponto.cidade}
            </p>
            <p style={{ margin: "0 0 0.5rem" }}>{ponto.descricao}</p>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#777" }}>
              {ponto.endereco} — {ponto.faixaPreco}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;