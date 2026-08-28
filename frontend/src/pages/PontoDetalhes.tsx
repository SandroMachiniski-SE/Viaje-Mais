import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import type { Ponto } from "../types/ponto";

function PontoDetalhes() {
  const { id } = useParams<{ id: string }>();
  const [ponto, setPonto] = useState<Ponto | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function buscarPonto() {
      if (!id) {
        setErro("Ponto turístico inválido.");
        setCarregando(false);
        return;
      }

      try {
        const resposta = await api.get<Ponto>(`/pontos/${id}`);
        setPonto(resposta.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
        setErro("Não foi possível carregar este ponto turístico.");
      } finally {
        setCarregando(false);
      }
    }

    buscarPonto();
  }, [id]);

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1rem" }}>
      <Link to="/" style={{ display: "inline-block", marginBottom: "1.5rem" }}>
        ← Voltar para a busca
      </Link>

      {carregando && <p>Carregando detalhes...</p>}

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {ponto && (
        <article>
          <h1>{ponto.nome}</h1>

          <p style={{ color: "#555" }}>
            {ponto.categoria} • {ponto.cidade}
          </p>

          <p>{ponto.descricao}</p>

          <div style={{ display: "grid", gap: "0.5rem" }}>
            <p>
              <strong>Endereço:</strong> {ponto.endereco}
            </p>

            <p>
              <strong>Faixa de preço:</strong> {ponto.faixaPreco}
            </p>

            <p>
              <strong>Acessibilidade:</strong> {ponto.acessibilidade}
            </p>

            {ponto.siteOficial && (
              <p>
                <strong>Site oficial:</strong>{" "}
                <a
                  href={ponto.siteOficial}
                  target="_blank"
                  rel="noreferrer"
                >
                  Acessar site
                </a>
              </p>
            )}

            {ponto.telefoneContato && (
              <p>
                <strong>Telefone:</strong> {ponto.telefoneContato}
              </p>
            )}

            {ponto.seloVerificado && (
              <p style={{ color: "green" }}>✔ Local verificado</p>
            )}
          </div>
        </article>
      )}
    </main>
  );
}

export default PontoDetalhes;