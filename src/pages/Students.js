import React, { useEffect, useState } from "react";
import api from "../api";
import StudentsTable from "../tables/StudentsTable";
import { TextField, Button, Paper } from "@mui/material";

function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchStudents = async () => {
    const res = await api.get("/students");
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async () => {
    if (!name || !email || !course) {
      alert("Fill all fields");
      return;
    }

    try {
      if (editingId) {
        await api.put(`/students/${editingId}`, { name, email, course });
        alert("Updated ✅");
      } else {
        await api.post("/students", { name, email, course });
        alert("Added ✅");
      }

      setName("");
      setEmail("");
      setCourse("");
      setEditingId(null);

      fetchStudents();
    } catch (err) {
      alert("Error occurred");
    }
  };

  return (
    <Paper style={styles.container}>
      <h2 style={styles.title}>Students Management</h2>

      <div style={styles.form}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Course" value={course} onChange={(e) => setCourse(e.target.value)} />

        <Button variant="contained" style={styles.button} onClick={handleSubmit}>
          {editingId ? "Update" : "Add"}
        </Button>
      </div>

      <StudentsTable
        students={students}
        refresh={fetchStudents}
        setEditing={(s) => {
          setName(s.name);
          setEmail(s.email);
          setCourse(s.course);
          setEditingId(s.id);
        }}
      />
    </Paper>
  );
}

export default Students;

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