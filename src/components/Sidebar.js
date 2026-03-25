import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>Admin</h2>

      <ul style={styles.menu}>
        <li>
          <NavLink to="/dashboard" style={styles.link}>
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/students" style={styles.link}>
            Students
          </NavLink>
        </li>

        <li>
          <NavLink to="/contacts" style={styles.link}>
            Contacts
          </NavLink>
        </li>

        <li>
          <NavLink to="/services" style={styles.link}>
            Services
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

const styles = {
  sidebar: {
    width: "220px",
    background: "#1976d2",
    color: "#fff",
    padding: "20px",
    height: "100vh",
  },
  logo: {
    marginBottom: "30px",
  },
  menu: {
    listStyle: "none",
    padding: 0,
  },
  link: {
    display: "block",
    padding: "10px",
    color: "#fff",
    textDecoration: "none",
  },
};