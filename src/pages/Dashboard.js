import { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import api from "../api";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [services, setServices] = useState([]);

  const fetchData = () => {
    api.get("/students").then(res => setStudents(res.data));
    api.get("/contacts").then(res => setContacts(res.data));
    api.get("/services").then(res => setServices(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      {/* Welcome Banner */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Avatar sx={{ mr: 2 }}>A</Avatar>
        <Box>
          <Typography variant="h5">Welcome, Admin 👋</Typography>
          <Typography variant="body2">
            Manage students, contacts, and services efficiently
          </Typography>
        </Box>
      </Box>

      {/* Dashboard Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2, cursor: "pointer", "&:hover": { backgroundColor: "#e0f7fa", transform:"scale(1.03)", transition:"0.2s" } }}>
            <CardContent>
              <Typography>Students</Typography>
              <Typography variant="h4">{students.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography>Contacts</Typography>
              <Typography variant="h4">{contacts.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography>Services</Typography>
              <Typography variant="h4">{services.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}