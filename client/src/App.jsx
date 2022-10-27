import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import MenuPage from './pages/menu/MenuPage'
import LoginPage from './pages/auth/LoginPage'
import AdminPageLayout from './components/AdminPageLayout'
import DashboardPage from './pages/dashboard/DashboardPage'
import EditRestaurantPage from './pages/dashboard/EditRestaurantPage'
import EditItemPage from './pages/dashboard/EditItemPage'
import RegisterPage from './pages/auth/RegisterPage'
import { UserProvider } from './context/UserContext'
import { RestaurantProvider } from './context/RestaurantContext'
import { MenuProvider } from './context/MenuContext'

function App() {
	return (
		<UserProvider>
			<Router>
				<RestaurantProvider>
					<MenuProvider>
						<Routes>
							<Route path="/:slug/menu" element={<MenuPage />} />
							<Route element={<AdminPageLayout />}>
								<Route path="/" element={<Home />} />
								<Route path="/login" element={<LoginPage />} />
								<Route path="/register" element={<RegisterPage />} />
								<Route path="/dashboard" element={<DashboardPage />} />
								<Route path="/dashboard/edit-restaurant" element={<EditRestaurantPage />} />
								<Route path="/dashboard/edit-item/:id" element={<EditItemPage />} />
								<Route path="/dashboard/add-item" element={<EditItemPage />} />
							</Route>
						</Routes>
					</MenuProvider>
				</RestaurantProvider>
			</Router>
		</UserProvider>
	)
}

export default App
