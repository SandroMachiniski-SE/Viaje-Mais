import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  const estiloLink = ({ isActive }: { isActive: boolean }) => ({
    color: "white",
    textDecoration: "none",
    fontWeight: isActive ? "bold" : "normal",
  });

  return (
    <div>
      <header
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "1rem",
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <NavLink
            to="/"
            style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
          >
            NomadPlan
          </NavLink>

          <nav style={{ display: "flex", gap: "1rem" }}>
            <NavLink to="/" style={estiloLink}>
              Explorar
            </NavLink>

            <NavLink to="/roteiros" style={estiloLink}>
              Meus roteiros
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer
        style={{
          maxWidth: 960,
          margin: "2rem auto 0",
          padding: "1rem",
          borderTop: "1px solid #ddd",
          color: "#666",
          textAlign: "center",
        }}
      >
        NomadPlan — descubra novos destinos.
      </footer>
    </div>
  );
}

export default Layout;