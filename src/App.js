import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/views/Dashboard';
import Layout from './components/views/Layout';
import { StoreProvider } from './hooks/useStore';
import { NotificationProvider } from './hooks/notificationContext';
import Todo from './components/views/Todo';
import TaskManager from './components/views/TaskManager';
import Profile from './components/views/Profile';
import Login from './components/views/Login';
import Signup from './components/views/SignUp';

function App() {
	return (
		<StoreProvider>
			<NotificationProvider>
				<div className="App">
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Layout />}>
								<Route index element={<Dashboard />} />
								<Route path="/edit/:id" element={<Todo />} />
								<Route path="/AddItem/Form" element={<TaskManager />} />
								<Route path='/account/profile' element={<Profile />} />
								<Route path="/login" element={<Login />} />
								<Route path="/signup" element={<Signup />} />
							</Route>
						</Routes>
					</BrowserRouter>
				</div>
			</NotificationProvider>
		</StoreProvider>
	);
}

export default App;
