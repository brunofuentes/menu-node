import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Menu from './Menu'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Dashboard from './Dashboard'
import RestaurantForm from './RestaurantForm'
import MenuItemForm from './MenuItemForm'
import AdminPageLayout from './AdminPageLayout'
import { UserProvider } from './UserContext'
import { RestaurantProvider } from './RestaurantContext'

function App() {
	return (
		<main>
			<UserProvider>
				<Router>
					<RestaurantProvider>
						<Routes>
							<Route path="/menu" element={<Menu />} />
							<Route element={<AdminPageLayout />}>
								<Route path="/" element={<Home />} />
								<Route path="/login" element={<LoginForm />} />
								<Route path="/register" element={<RegisterForm />} />
								<Route path="/dashboard" element={<Dashboard />} />
								<Route path="/dashboard/edit-restaurant" element={<RestaurantForm />} />
								<Route path="/dashboard/edit-item" element={<MenuItemForm />} />
								<Route path="/dashboard/add-item" element={<MenuItemForm />} />
							</Route>
						</Routes>
					</RestaurantProvider>
				</Router>
			</UserProvider>
		</main>
	)
}

export default App
