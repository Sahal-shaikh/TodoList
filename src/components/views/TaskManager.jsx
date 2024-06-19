import React from "react";
import FormDetails from "./FormDetails";
import { Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import useStore from "../../hooks/useStore";
import { useNotification } from "../../hooks/notificationContext";

const TaskManager = () => {
  const { dispatch } = useStore();
  const showNotification = useNotification();

  const addTask = async (newTask) => {
    const token = localStorage.getItem("token"); // Retrieve token
    try {
      const response = await axios.post("/api/tasks", newTask, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      });
      dispatch({ type: "ADD_TODO", payload: response.data });
      showNotification("Task added successfully", "success");
    } catch (error) {
      console.error("Error creating task:", error);
      showNotification("Failed to add task", "error");
    }
  };

  return (
    <div>
      <Grid item xs={12} sm={6} sx={{ textAlign: "left", marginBlock: "1rem" }}>
        <Typography
          variant="h4"
          component="h4"
          sx={{ fontWeight: "bold", fontSize: "2rem" }}
          className="task-manager"
        >
          Todos
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      </Grid>

      <FormDetails onSubmit={addTask} />
    </div>
  );
};

export default TaskManager;
