import React from 'react'
import { useNavigate } from 'react-router'
import UserContext from '../context/UserContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
	const { isLogged, logoutUser, setShowSidebar, showSidebar } = useContext(UserContext)

	let navigate = useNavigate()

	return (
		<nav className="sticky text-white text-xl bg-slate-500 flex items-center justify-between h-[8vh] shadow-md">
			{isLogged && (
				<div className="mx-2 sm:mx-5">
					<button onClick={() => setShowSidebar(!showSidebar)}>
						<img
							height="25px"
							width="25px"
							className="invert"
							src="/images/icons/hamburger_menu.svg"
							alt=""
						/>
					</button>
				</div>
			)}
			<div className="mx-2 sm:mx-5">
				<Link to="/">Menu App</Link>
			</div>
			<div className="flex mx-2 sm:mx-5">
				{isLogged ? (
					<div>
						<Link to="/dashboard/menu">Dashboard</Link>
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
