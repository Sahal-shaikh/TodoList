import React, { useState } from "react";
import {
  Grid,
  Typography,
  Divider,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../Styles/todo.css"; // Import the shared styles

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "user", // Assuming there's a role field with default value
  });

  const [error, setError] = useState("");

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      localStorage.setItem("userData", JSON.stringify(data));
      console.log(data); // Handle successful signup

      // Redirect to login after successful signup
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      setError(error.message);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Grid container spacing={2} sx={{ width: "100%", margin: "auto" }}>
      <Grid item xs={12} sm={6} sx={{ textAlign: "left" }} className="heading">
        <Typography variant="h4" component="h4" sx={{ fontWeight: "bold" }}>
          Todos
        </Typography>
      </Grid>
      <Grid item xs={12} className="heading">
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        lg={4}
        className="main-todo-div"
        sx={{ margin: "auto" }}
      >
        <Typography
          className="heading"
          variant="h4"
          component="h4"
          sx={{ fontWeight: "bold", textAlign: "left" }}
        >
          Sign Up
        </Typography>
        <TextField
          className="todo-textfield"
          label="Username"
          id="outlined-username"
          size="small"
          value={formData.username}
          name="username"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          className="todo-textfield"
          label="Email"
          id="outlined-email"
          size="small"
          value={formData.email}
          name="email"
          type="email"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          className="todo-textfield"
          label="Phone"
          id="outlined-phone"
          size="small"
          value={formData.phone}
          name="phone"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          className="todo-textfield"
          label="Password"
          id="outlined-password"
          size="small"
          value={formData.password}
          name="password"
          type="password"
          onChange={handleChange}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            className="todo-textfield"
            labelId="role-select-label"
            label="Role"
            id="outlined-role"
            size="small"
            value={formData.role}
            name="role"
            onChange={handleChange}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
        {error && <Typography color="error">{error}</Typography>}
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          marginTop="1rem"
        >
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            sx={{ width: "100%" }}
          >
            Sign Up
          </Button>
        </Grid>
        <Typography variant="body2">
          Already have an account?
          <Link component="button" onClick={handleLogin}>
            Login
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Signup;
