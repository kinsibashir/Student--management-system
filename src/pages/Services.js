import React, { useEffect, useState } from "react";
import api from "../api";
import ServicesTable from "../tables/ServicesTable";
import { TextField, Button, Paper } from "@mui/material";

function Services() {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchServices = async () => {
    const res = await api.get("/services");
    setServices(res.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async () => {
    if (!title || !description) {
      alert("Fill all fields");
      return;
    }

    try {
      if (editingId) {
        await api.put(`/services/${editingId}`, { title, description });
        alert("Updated ✅");
      } else {
        await api.post("/services", { title, description });
        alert("Added ✅");
      }

      setTitle("");
      setDescription("");
      setEditingId(null);

      fetchServices();
    } catch (err) {
      alert("Error occurred");
    }
  };

  return (
    <Paper style={styles.container}>
      <h2 style={styles.title}>Services</h2>

      <div style={styles.form}>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <Button variant="contained" style={styles.button} onClick={handleSubmit}>
          {editingId ? "Update" : "Add"}
        </Button>
      </div>

      <ServicesTable
        services={services}
        refresh={fetchServices}
        setEditing={(s) => {
          setTitle(s.title);
          setDescription(s.description);
          setEditingId(s.id);
        }}
      />
    </Paper>
  );
}

export default Services;

const styles = {
  container: {
    padding: "25px",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
  },
  title: {
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    gap: "15px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "#1976d2",
    color: "#fff",
    fontWeight: "bold",
  },
};