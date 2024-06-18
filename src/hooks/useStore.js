import { createContext, useContext, useReducer } from 'react';

export const TODOS = [];

const initialState = {
	todos: [...TODOS],
	loading: false,
	todoDetails: {},
	error: null,
};


const reducer = (state, action) => {
	switch (action.type) {
		case 'GET_TODOS_PENDING':
			return {
				...state,
				loading: true,
			};
		case 'GET_TODOS_SUCCESS':
			return {
				...state,
				todos: [...action.payload],
				loading: false,
			};
		case 'GET_TODOS_FAILURE':
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case 'SET_LOADING_FALSE':
			return {
				...state,
				loading: false,
			};
		case 'REMOVE_TODO': {
			const updatedTodos = state.todos.filter(todo => todo._id !== action.payload);
			return {
				...state,
				todos: updatedTodos,
			};
		}
		case 'SET_TODO_DETAILS': {
			const newTodoDetails = state.todos.find(
				(todo) => todo._id === action.payload
			);
			return {
				...state,
				todoDetails: { ...newTodoDetails },
			};
		}
		case 'VALUE_CHANGE':
			return {
				...state,
				todoDetails: {
					...state.todoDetails,
					[action.payload.name]: action.payload.value,
				},
			};
		case 'ADD_TODO': {
			const newTodo = {
				_id: state.todos.length + 1, // Ensure new _id is correctly set from backend
				...action.payload,
			};
			return {
				...state,
				todos: [...state.todos, newTodo],
			};
		}
		case 'SAVE_TODO_DETAILS': {
			const updatedTodos = state.todos.map(todo =>
				todo._id === action.payload._id ? action.payload : todo
			);
			return {
				...state,
				todos: updatedTodos,
				todoDetails: {} // Clear todoDetails after saving
			};
		}
		default:
			return state;
	}
};



export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
};

const useStore = () => {
	return useContext(StoreContext);
};

export default useStore;
