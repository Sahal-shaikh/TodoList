import { Box, Paper } from '@mui/material';
import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<Box
			className="Box"
			sx={{
				padding: 2
			}}
		>
			<Outlet />
		</Box>
	);
};

export default memo(Layout);
