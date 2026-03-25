import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import api from "../api";

function StudentsTable({ students, refresh, setEditing }) {
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await api.delete(`/students/${id}`);
      alert("Deleted ✅");
      refresh();
    } catch (error) {
      alert("Error deleting");
    }
  };

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Name</th>
          <th style={styles.th}>Email</th>
          <th style={styles.th}>Course</th>
          <th style={styles.th}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.map((s) => (
          <tr
            key={s.id}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
          >
            <td style={styles.td}>{s.name}</td>
            <td style={styles.td}>{s.email}</td>
            <td style={styles.td}>{s.course}</td>
            <td style={styles.td}>
              <IconButton onClick={() => setEditing(s)}>
                <EditIcon color="primary" />
              </IconButton>

              <IconButton onClick={() => handleDelete(s.id)}>
                <DeleteIcon color="error" />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentsTable;

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    backgroundColor: "#fff",
  },
  th: {
    border: "1px solid #ddd",
    padding: "12px",
    backgroundColor: "#1976d2",
    color: "#fff",
    textAlign: "left",
  },
  td: {
    border: "1px solid #ddd",
    padding: "10px",
  },
};