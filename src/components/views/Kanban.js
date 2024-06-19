import {
	Avatar,
	Card,
	CardContent,
	Chip,
	Grid,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import { memo } from 'react';
import StatusChip from './StatusChip';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/useStore';
import { useNotification } from '../../hooks/notificationContext';
import { fetchWithAuth } from '../../Utils/Auth'; // Add this import

const Kanban = ({ todo }) => {
	const { _id, title, description, status, created } = todo;
	const navigate = useNavigate();
	const { dispatch } = useStore();
	const showNotification = useNotification();

	const handleEditClick = () => {
		navigate(`/edit/${_id}`);
	};

	const handleDeleteClick = async (ev) => {
		ev.stopPropagation();
		try {
			const response = await fetchWithAuth(`/api/tasks/${_id}`, {
				method: 'DELETE',
			});

			if (!response.ok) {
				throw new Error('Failed to delete todo');
			}

			dispatch({ type: 'REMOVE_TODO', payload: _id });
			showNotification('Task deleted successfully', 'success');
		} catch (error) {
			console.error('Error deleting todo:', error);
			showNotification('Failed to delete task', 'error');
		}
	};

	return (
		<Grid item sm={12} md={3}>
			<Card elevation={4} className="kanban-card">
				<CardContent>
					<Stack spacing={2} direction="row" alignItems="center" textAlign="left">
						<Avatar aria-label="title">{title[0].toUpperCase()}</Avatar>
						<Typography sx={{ fontWeight: 'bold', flexGrow: 4 }} variant="body1" noWrap>
							{description}
						</Typography>
						<IconButton onClick={handleEditClick}>
							<EditIcon />
						</IconButton>
						<IconButton onClick={handleDeleteClick}>
							<DeleteIcon />
						</IconButton>
					</Stack>
					<Stack sx={{ marginTop: 2 }} spacing={2} direction="row">
						<StatusChip status={status} />
						<Chip icon={<CalendarMonthIcon />} size="small" label={created} />
					</Stack>
				</CardContent>
			</Card>
		</Grid>
	);
};

Kanban.propTypes = {
	todo: PropTypes.shape({
		_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired,
		created: PropTypes.string.isRequired,
	}).isRequired,
};

export default memo(Kanban);
