import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Menu from './pages/menu/Menu'
import LoginForm from './pages/home/LoginForm'
import RegisterForm from './pages/home/RegisterForm'
import Dashboard from './pages/dashboard/Dashboard'
import RestaurantForm from './pages/dashboard/RestaurantForm'
import MenuItemForm from './pages/dashboard/MenuItemForm'
import AdminPageLayout from './components/AdminPageLayout'
import { UserProvider } from './context/UserContext'
import { RestaurantProvider } from './context/RestaurantContext'
import { MenuProvider } from './context/MenuContext'

function App() {
	return (
		<main>
			<UserProvider>
				<Router>
					<RestaurantProvider>
						<MenuProvider>
							<Routes>
								<Route path="/:slug/menu" element={<Menu />} />
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
						</MenuProvider>
					</RestaurantProvider>
				</Router>
			</UserProvider>
		</main>
	)
}

export default App
