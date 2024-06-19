import { useEffect } from 'react';
import useStore from './useStore';
import { fetchWithAuth } from '../Utils/Auth';

const useFetch = (url) => {
	const { dispatch } = useStore();

	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: 'GET_TODOS_PENDING' });
			try {
				const response = await fetchWithAuth(url);
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
