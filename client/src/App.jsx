import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Dashboard from './Dashboard'
import RestaurantForm from './RestaurantForm'
import { UserProvider } from './UserContext'
import { RestaurantProvider } from './RestaurantContext'

function App() {
	return (
		<main>
			<UserProvider>
				<RestaurantProvider>
					<Router>
						<div className="relative">
							<Navbar />
						</div>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<LoginForm />} />
							<Route path="/register" element={<RegisterForm />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/dashboard/edit-restaurant" element={<RestaurantForm />} />
						</Routes>
					</Router>
				</RestaurantProvider>
			</UserProvider>
		</main>
	)
}

export default App
