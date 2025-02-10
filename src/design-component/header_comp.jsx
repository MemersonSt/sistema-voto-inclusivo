import { Outlet } from "react-router-dom";

export function HeaderComp() {
  return (
    <header style={styles.header}>
      <h1>Sistema de Votación para Personas No Videntes</h1>
      <Outlet />
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#282c34",
    color: "White",
    padding: "20px",
    textAlign: "center",
    fontSize: "24px",
  },
};

export default HeaderComp;
