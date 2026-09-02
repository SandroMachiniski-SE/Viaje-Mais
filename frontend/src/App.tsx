import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NaoEncontrado from "./pages/NaoEncontrado";
import PontoDetalhes from "./pages/PontoDetalhes";
import Roteiros from "./pages/Roteiros";
import RoteiroDetalhes from "./pages/RoteiroDetalhes";
import NovoRoteiro from "./pages/NovoRoteiro";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pontos/:id" element={<PontoDetalhes />} />
        <Route path="/roteiros" element={<Roteiros />} />
        <Route path="/roteiros/:id" element={<RoteiroDetalhes />} />
        <Route path="/roteiros/novo" element={<NovoRoteiro />} />
      </Route>

      <Route path="*" element={<NaoEncontrado />} />
    </Routes>
  );
}

export default App;