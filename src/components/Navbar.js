import React from "react";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.left}>
        <img src="/logo.png" alt="logo" style={styles.logo} />
      </div>

      <button style={styles.logout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 25px",
    backgroundColor: "#ffffff",
    borderBottom: "2px solid #eee",
  },

  left: {
    display: "flex",
    alignItems: "center",
  },

  logo: {
    height: "70px",   // 🔥 increase this if still small (80–90px also OK)
    width: "auto",    // 🔥 VERY IMPORTANT (keeps full banner shape)
    objectFit: "contain",
  },

  logout: {
    padding: "10px 18px",
    backgroundColor: "#d32f2f",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Navbar;