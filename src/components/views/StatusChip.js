import { Chip } from '@mui/material';
import PropTypes from 'prop-types';
import { memo } from 'react';

export const STATUS_COLORS = {
	open: {
		label: 'Open',
	},
	inprogress: {
		label: 'In Progress',
		color: 'primary',
	},
	done: {
		label: 'Done',
		color: 'success',
	},
};

const StatusChip = ({ status }) => {
	return (
		<Chip
			size="small"
			label={STATUS_COLORS[status].label}
			color={STATUS_COLORS[status].color}
		/>
	);
};

StatusChip.propTypes = {
	status: PropTypes.string,
};

export default memo(StatusChip);
