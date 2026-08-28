import { Link } from "react-router-dom";

function NaoEncontrado() {
  return (
    <main style={{ textAlign: "center", padding: "4rem 1rem" }}>
      <h1>404</h1>
      <p>A página que você tentou acessar não existe.</p>
      <Link to="/">Voltar para a página inicial</Link>
    </main>
  );
}

export default NaoEncontrado;