import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const userStatus = () => {
	const token = localStorage.getItem('token')
	if (token == null) return false
	return true
}

function Navbar() {
	let navigate = useNavigate()

	const [isLogged, setIsLogged] = useState(() => userStatus())

	const handleLogOut = () => {
		localStorage.clear()
		setIsLogged((prevIsLogged) => (prevIsLogged = false))
		navigate('/')
	}

	const handleLogIn = () => {
		navigate('/login')
	}

	return (
		<nav className="relative text-white font-semibold font-mono text-xl bg-gray-600 flex items-center justify-between py-5">
			<div className="mx-2 sm:mx-5">
				<a href="/">Menu App</a>
			</div>
			<div className="flex mx-2 sm:mx-5">
				{isLogged ? (
					<button onClick={handleLogOut} className="px-1">
						Logout
					</button>
				) : (
					<button onClick={handleLogIn} className="px-1">
						Login
					</button>
				)}
			</div>
		</nav>
	)
}

export default Navbar
