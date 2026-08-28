function Roteiros() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1>Meus roteiros</h1>
      <p>Seus roteiros personalizados aparecerão aqui.</p>

      <div
        style={{
          border: "1px dashed #aaa",
          borderRadius: 8,
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <p>Você ainda não tem roteiros cadastrados.</p>
        <p>Em breve será possível criar e organizar suas viagens.</p>
      </div>
    </div>
  );
}

export default Roteiros;