import Navbar from "./Navbar"
import LoginForm from "./LoginForm"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginForm from './LoginForm'

function App() {
	return (
		<main>
			<Navbar />
			<LoginForm />
			<Router>
				<div className="relative">
					<Navbar />
				</div>
				<Routes>
					<Route path="/login" element={<LoginForm />} />
				</Routes>
			</Router>
		</main>
	)
}

export default App
