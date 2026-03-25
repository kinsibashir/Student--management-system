import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div style={styles.container}>
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div style={styles.main}>
        
        {/* TOP NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <div style={styles.content}>
          {children}
        </div>

      </div>
    </div>
  );
}

export default Layout;

const styles = {
  container: {
    display: "flex",
  },

  main: {
    flex: 1,
    background: "#f5f5f5",
    minHeight: "100vh",
  },

  content: {
    padding: "20px",
  },
};