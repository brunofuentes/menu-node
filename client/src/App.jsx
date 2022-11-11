import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { RestaurantProvider } from './context/RestaurantContext'
import { MenuProvider } from './context/MenuContext'
import Home from './pages/home/Home'
import MenuPage from './pages/menu/MenuPage'
import LoginPage from './pages/auth/LoginPage'
import AdminPageLayout from './components/AdminPageLayout'
import DashboardPage from './pages/dashboard/DashboardPage'
import EditRestaurantPage from './pages/dashboard/EditRestaurantPage'
import EditItemPage from './pages/dashboard/EditItemPage'
import RegisterPage from './pages/auth/RegisterPage'
import PageLayout from './components/PageLayout'
import UserPage from './pages/dashboard/UserPage'
import MenuItemsPage from './pages/dashboard/MenuItemsPage'
import RestaurantPage from './pages/dashboard/RestaurantPage'
import QRCodePage from './pages/dashboard/QRCodePage'

function App() {
	return (
		<Router>
			<UserProvider>
				<RestaurantProvider>
					<MenuProvider>
						<Routes>
							<Route path="/:slug/menu" element={<MenuPage />} />
							<Route element={<PageLayout />}>
								<Route path="/" element={<Home />} />
								<Route path="/login" element={<LoginPage />} />
								<Route path="/register" element={<RegisterPage />} />
								<Route path="*" element={<Navigate to="/" replace />} />
							</Route>
							<Route element={<AdminPageLayout />}>
								<Route path="/dashboard" element={<DashboardPage />} />
								<Route path="/dashboard/restaurant" element={<RestaurantPage />} />
								<Route path="/dashboard/add-restaurant" element={<EditRestaurantPage />} />
								<Route path="/dashboard/edit-restaurant" element={<EditRestaurantPage />} />
								<Route path="/dashboard/menu" element={<MenuItemsPage />} />
								<Route path="/dashboard/add-item" element={<EditItemPage />} />
								<Route path="/dashboard/edit-item/:id" element={<EditItemPage />} />
								<Route path="/dashboard/qr-code" element={<QRCodePage />} />
								<Route path="/dashboard/account" element={<UserPage />} />
								<Route path="/dashboard/*" element={<Navigate to="/dashboard" replace />} />
							</Route>
						</Routes>
					</MenuProvider>
				</RestaurantProvider>
			</UserProvider>
		</Router>
	)
}

export default App
