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
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/views/ProtectedRoute';

function App() {
	return (
		<StoreProvider>
			<NotificationProvider>
				<AuthProvider>
					<div className="App">
						<BrowserRouter>
							<Routes>
								<Route path="/" element={<Layout />}>
									<Route index element={
										<ProtectedRoute>
											<Dashboard />
										</ProtectedRoute>
									} />
									<Route path="/edit/:id" element={
										<ProtectedRoute>
											<Todo />
										</ProtectedRoute>
									} />
									<Route path="/AddItem/Form" element={
										<ProtectedRoute>
											<TaskManager />
										</ProtectedRoute>
									} />
									<Route path='/account/profile' element={
										<ProtectedRoute>
											<Profile />
										</ProtectedRoute>
									} />
									<Route path="/login" element={<Login />} />
									<Route path="/signup" element={<Signup />} />
								</Route>
							</Routes>
						</BrowserRouter>
					</div>
				</AuthProvider>
			</NotificationProvider>
		</StoreProvider>
	);
}

export default App;
