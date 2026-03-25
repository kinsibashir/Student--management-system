import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import api from "../api";

function ContactsTable({ contacts, refresh, setEditing }) {
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;

    try {
      await api.delete(`/contacts/${id}`);
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
          <th style={styles.th}>Message</th>
          <th style={styles.th}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {contacts.map((c) => (
          <tr
            key={c.id}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
          >
            <td style={styles.td}>{c.name}</td>
            <td style={styles.td}>{c.email}</td>
            <td style={styles.td}>{c.message}</td>
            <td style={styles.td}>
              <IconButton onClick={() => setEditing(c)}>
                <EditIcon color="primary" />
              </IconButton>

              <IconButton onClick={() => handleDelete(c.id)}>
                <DeleteIcon color="error" />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ContactsTable;

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