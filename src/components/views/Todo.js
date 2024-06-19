import { memo, useEffect, useState } from 'react';
import useStore from '../../hooks/useStore';
import '../../Styles/todo.css';
import {
	Button,
	Divider,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useNotification } from '../../hooks/notificationContext';
import { fetchWithAuth } from '../../Utils/Auth'; // Add this import

const Todo = () => {
	const { state, dispatch } = useStore();
	const { id } = useParams();
	const navigate = useNavigate();
	const showNotification = useNotification();

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		status: ''
	});

	useEffect(() => {
		if (id) {
			const action = {
				type: 'SET_TODO_DETAILS',
				payload: id,
			};
			dispatch(action);
		}
	}, [id, dispatch]);

	useEffect(() => {
		// Update formData when state.todoDetails changes
		if (state.todoDetails) {
			setFormData(state.todoDetails);
		}
	}, [state.todoDetails]);

	const handleChange = (ev) => {
		const { name, value } = ev.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSave = async () => {
		try {
			const response = await fetchWithAuth(`/api/tasks/edit/${formData._id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error('Failed to update todo');
			}

			const updatedTodo = await response.json();
			const action = {
				type: 'SAVE_TODO_DETAILS',
				payload: updatedTodo,
			};
			dispatch(action);
			showNotification('Task updated successfully', 'success');
			navigate('/'); // Redirect to the dashboard after saving
		} catch (error) {
			console.error('Error updating todo:', error);
			showNotification('Failed to update task', 'error');
		}
	};

	const handleBack = (e) => {
		navigate("/");
	}

	return (
		<Grid container spacing={2} sx={{ width: '100%', margin: 'auto' }}>
			<Grid item xs={12} sm={6} sx={{ textAlign: 'left' }}>
				<Typography
					variant="h4"
					component="h4"
					sx={{ fontWeight: 'bold' }}
				>
					Todos
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Divider sx={{ marginTop: 2, marginBottom: 2 }} />
			</Grid>
			<Grid item xs={12} sm={8} md={6} lg={4} className="main-todo-div" sx={{ margin: 'auto' }}>
				<Typography
					variant="h4"
					component="h4"
					sx={{ fontWeight: "bold", textAlign: "left" }}
				>
					Edit Task
				</Typography>
				<TextField
					className='todo-textfield'
					label="Title"
					id="outlined-title"
					size="small"
					value={formData.title}
					name="title"
					onChange={handleChange}
					fullWidth
				/>
				<TextField
					className='todo-textfield'
					label="Description"
					id="outlined-description"
					size="small"
					value={formData.description}
					name="description"
					multiline
					onChange={handleChange}
					fullWidth
				/>
				<FormControl fullWidth>
					<InputLabel id="status-select-label">Status</InputLabel>
					<Select
						className='todo-textfield'
						labelId="status-select-label"
						label="Status"
						id="outlined-status"
						size="small"
						value={formData.status || 'status'}
						name="status"
						onChange={handleChange}
					>
						<MenuItem value="status">STATUS</MenuItem>
						<MenuItem value="open">Open</MenuItem>
						<MenuItem value="inprogress">In Progress</MenuItem>
						<MenuItem value="done">Done</MenuItem>
					</Select>
				</FormControl>
				<Grid sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
					<Button
						variant="contained"
						color="success"
						onClick={handleSave}
					>
						Save Task
					</Button>
					<Button
						variant="outlined"
						color="success"
						onClick={handleBack}
					>
						Cancel
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default memo(Todo);
