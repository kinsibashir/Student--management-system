import React, { useEffect, useState } from "react";
import api from "../api";
import ContactsTable from "../tables/ContactsTable";
import { TextField, Button, Paper } from "@mui/material";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchContacts = async () => {
    const res = await api.get("/contacts");
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      alert("Fill all fields");
      return;
    }

    try {
      if (editingId) {
        await api.put(`/contacts/${editingId}`, { name, email, message });
        alert("Updated ✅");
      } else {
        await api.post("/contacts", { name, email, message });
        alert("Added ✅");
      }

      setName("");
      setEmail("");
      setMessage("");
      setEditingId(null);

      fetchContacts();
    } catch (err) {
      alert("Error occurred");
    }
  };

  return (
    <Paper style={styles.container}>
      <h2 style={styles.title}>Contacts</h2>

      <div style={styles.form}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Message" value={message} onChange={(e) => setMessage(e.target.value)} />

        <Button variant="contained" style={styles.button} onClick={handleSubmit}>
          {editingId ? "Update" : "Add"}
        </Button>
      </div>

      <ContactsTable
        contacts={contacts}
        refresh={fetchContacts}
        setEditing={(c) => {
          setName(c.name);
          setEmail(c.email);
          setMessage(c.message);
          setEditingId(c.id);
        }}
      />
    </Paper>
  );
}

export default Contacts;

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