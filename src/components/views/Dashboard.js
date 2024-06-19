import React, { memo, useState } from "react";
import { Grid, Typography, Divider, Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import Kanban from "./Kanban";
import useStore from "../../hooks/useStore";
import useFetch from "../../hooks/useFetch"; // Import the custom hook
import "../../Styles/dashboard.css";
import userIcon from "../../Assets/person.png"
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	const { state } = useStore();
	const [filter, setFilter] = useState("All");
	const [anchorEl, setAnchorEl] = useState(null);
	const navigate = useNavigate();

	// Fetch tasks on component mount
	useFetch("/api/tasks");

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
	};

	const filterTodos = (todos) => {
		if (filter === "All") {
			return todos;
		}
		return todos.filter((todo) => todo.status === filter);
	};

	const filteredTodos = filterTodos(state.todos);

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleProfile = () => {
		navigate("/account/profile");
		handleMenuClose();
	};

	const handleLogout = () => {
		// Handle logout logic here
		navigate("/login"); // For now, redirect to the login page
		handleMenuClose();
	};

	return (
		<Grid container className="todo-header">
			<div className="mobile-device-responsive-header">
				<Grid item xs={12} sm={6} sx={{ textAlign: "left" }}>
					<Typography variant="h4" component="h4" sx={{ fontWeight: "bold" }}>
						Todos
					</Typography>
				</Grid>

				<div className="flex-container">
					<AddNote />
					<div className="filter">
						<select
							name="Filter"
							id="filter-select"
							value={filter}
							onChange={handleFilterChange}
						>
							<option value="All">ALL</option>
							<option value="open">To Do</option>
							<option value="inprogress">In Progress</option>
							<option value="done">Done</option>
						</select>
					</div>
					<div className="profile-section">
						<IconButton onClick={handleMenuOpen} sx={{ padding: '0' }}>
							<Avatar alt="User Profile" src={userIcon} sx={{ height: "2rem", width: 'auto' }} />
						</IconButton>
						<Menu
							id="profile-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleMenuClose}
						>
							<MenuItem onClick={handleProfile}>Profile</MenuItem>
							<MenuItem onClick={handleLogout}>Logout</MenuItem>
						</Menu>
					</div>
				</div>
			</div>

			<Grid item xs={12}>
				<Divider sx={{ marginTop: 2, marginBottom: 2 }} />
			</Grid>

			{/* <Grid container spacing={2}>
				{filteredTodos.map((todo) => (
					<Kanban key={todo._id} todo={todo} />
				))}
			</Grid> */}


			<Grid container spacing={2}>
				{filteredTodos.length > 0 ? (
					filteredTodos.map((todo) => (
						<Kanban key={todo._id} todo={todo} />
					))
				) : (
					<Grid sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>

						<Typography variant="h6" component="h6" sx={{ textAlign: "center" }}>
							No Task Available!
						</Typography>
					</Grid>
				)}
			</Grid>

		</Grid>
	);
};

export default memo(Dashboard);
