import React, { useState } from "react";
import "../../Styles/formdetails.css";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FormDetails = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [created, setCreated] = useState("");

  const navigate = useNavigate();

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = created
      ? formatDate(created)
      : formatDate(new Date());
    const newTask = {
      title,
      description,
      status,
      created: formattedDate,
    };
    console.log("New Task:", newTask); // Log the new task object
    onSubmit(newTask);
    setTitle("");
    setDescription("");
    setStatus("open");
    setCreated("");

    navigate("/");
  };

  const HandleOnCancle = () => {
    navigate("/");
  };

  return (
    <Grid className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="handle-form">
          <Typography
            variant="h4"
            component="h4"
            sx={{ fontWeight: "bold", textAlign: "left", marginBottom: "15px" }}
          >
            Create New Task
          </Typography>
          <label htmlFor="title">Title</label>
          <input
            placeholder="Enter title"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="handle-form">
          <label htmlFor="description">Description</label>
          <input
            placeholder="Enter description"
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="handle-form">
          <label htmlFor="status">Status</label>
          <select
            className="custom-select"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="open">Open</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Completed</option>
          </select>
        </div>
        <div className="handle-form">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            value={created}
            onChange={(e) => setCreated(e.target.value)}
          />
        </div>

        <button type="submit">Add Task</button>
        <button onClick={HandleOnCancle} className="cancle-btn">
          Cancle
        </button>
      </form>
    </Grid>
  );
};

export default FormDetails;
