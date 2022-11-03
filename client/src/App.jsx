import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import RestaurantData from './components/dashboard/RestaurantData'
import ItemsTable from './components/dashboard/ItemsTable'
import QRCodeData from './components/dashboard/QRCodeData'
import PageLayout from './components/PageLayout'

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
							</Route>
							<Route element={<AdminPageLayout />}>
								<Route path="/dashboard" element={<DashboardPage />} />
								<Route path="/dashboard/restaurant" element={<RestaurantData />} />
								<Route path="/dashboard/edit-restaurant" element={<EditRestaurantPage />} />
								<Route path="/dashboard/menu" element={<ItemsTable />} />
								<Route path="/dashboard/edit-item/:id" element={<EditItemPage />} />
								<Route path="/dashboard/add-item" element={<EditItemPage />} />
								<Route path="/dashboard/qr-code" element={<QRCodeData />} />
							</Route>
						</Routes>
					</MenuProvider>
				</RestaurantProvider>
			</UserProvider>
		</Router>
	)
}

export default App
