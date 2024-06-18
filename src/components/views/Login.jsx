import React, { useState } from "react";
import {
  Grid,
  Typography,
  Divider,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../Styles/todo.css"; // Import the shared styles

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await fetch("/api/auth/login", {
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
      // After successful login or signup
      localStorage.setItem("userData", JSON.stringify(data));
      console.log(data); // Handle successful login

      // Redirect to dashboard after successful login
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.message);
    }
  };

  // const handleSubmit = async (email, password) => {
  //   try {
  //     const response = await fetch("/api/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       // Store the user data and token in local storage
  //       localStorage.setItem(
  //         "userData",
  //         JSON.stringify({ user: data.user, token: data.token })
  //       );
  //       // Navigate to the profile page or dashboard
  //       navigate("/profile");
  //     } else {
  //       // Handle login error
  //       console.error(data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error logging in:", error);
  //   }
  // };

  const handleSignUp = () => {
    navigate("/signup");
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
          variant="h4"
          component="h4"
          sx={{ fontWeight: "bold", textAlign: "left" }}
        >
          Login Form
        </Typography>
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
          label="Password"
          id="outlined-password"
          size="small"
          value={formData.password}
          name="password"
          type="password"
          onChange={handleChange}
          fullWidth
        />
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
            Login
          </Button>
        </Grid>
        <Typography variant="body2">
          Don't have an account?
          <Link component="button" onClick={handleSignUp}>
            Sign Up
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Login;
