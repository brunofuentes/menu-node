import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Dashboard from './Dashboard'

function App() {
	return (
		<main>
			<Router>
				<div className="relative">
					<Navbar />
				</div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginForm />} />
					<Route path="/register" element={<RegisterForm />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</Router>
		</main>
	)
}

export default App
