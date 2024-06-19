import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Avatar,
  Paper,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DP from "../../Assets/profile-icon.png"; // Fix the import
import "../../Styles/profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData)); // Access the 'user' object inside 'userData'
    }
  }, []);

  return (
    <>
      <Grid item xs={12} sm={6} sx={{ textAlign: "left" }} className="heading">
        <Typography variant="h4" component="h4" sx={{ fontWeight: "bold" }}>
          Todos
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      </Grid>
      <Box sx={{ padding: 4, maxWidth: 600, margin: "auto" }}>
        <Paper elevation={4} sx={{ padding: 4, borderRadius: 2 }}>
          <Grid container spacing={2} className="profile-container">
            <Grid item xs={12} className="profile-header">
              <Avatar
                alt={user?.userData || "User"}
                src={user?.profileImage || DP}
                sx={{ width: 120, height: 120, margin: "auto", boxShadow: 3 }}
              />
              <Typography
                variant="h5"
                component="h5"
                sx={{ fontWeight: "bold", marginTop: 2 }}
              >
                {user?.username || "User"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginY: 2 }} />
            </Grid>
            <Grid item xs={12} className="profile-details">
              <Typography
                variant="body1"
                component="p"
                sx={{ marginBottom: 1 }}
              >
                <strong>Email:</strong> {user?.email || "N/A"}
              </Typography>
              <Typography variant="body1" component="p">
                <strong>Phone:</strong> {user?.phone || "N/A"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              className="profile-footer"
              sx={{ marginTop: 2, textAlign: "center" }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/")}
                sx={{ marginTop: 2 }}
              >
                Back to Dashboard
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default Profile;
