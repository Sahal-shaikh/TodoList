import { useEffect } from 'react';
import useStore from './useStore';

const useFetch = (url) => {
	const { dispatch } = useStore();

	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: 'GET_TODOS_PENDING' });
			const token = localStorage.getItem('token'); // Retrieve token from local storage
			try {
				const response = await fetch(url, {
					headers: {
						'Authorization': `Bearer ${token}` // Include the token in headers
					}
				});
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				dispatch({ type: 'GET_TODOS_SUCCESS', payload: data });
			} catch (error) {
				dispatch({ type: 'GET_TODOS_FAILURE', payload: error.message });
			}
		};

		fetchData();
	}, [url, dispatch]);
};

export default useFetch;
