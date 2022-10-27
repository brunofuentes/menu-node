import React from 'react'
import { useNavigate } from 'react-router'
import UserContext from './../context/UserContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
	const { isLogged, GetUserStatus, logoutUser } = useContext(UserContext)
	GetUserStatus()

	let navigate = useNavigate()

	return (
		<nav className="sticky text-white text-xl bg-gray-600 flex items-center justify-between py-5">
			<div className="mx-2 sm:mx-5">
				<Link to="/">Menu App</Link>
			</div>
			<div className="flex mx-2 sm:mx-5">
				{isLogged ? (
					<div>
						<Link to="/dashboard">Dashboard</Link>
						<button
							onClick={() => {
								logoutUser()
								navigate('/')
							}}
							className="px-3"
						>
							Logout
						</button>
					</div>
				) : (
					<button onClick={() => navigate('/login')} className="px-1">
						Login
					</button>
				)}
			</div>
		</nav>
	)
}

export default Navbar
