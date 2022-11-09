import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'

function Sidebar() {
	const { isLogged, showSidebar } = useContext(UserContext)

	if (!isLogged) {
		return
	}

	return (
		<div
			className={`${
				!showSidebar && 'sm:-ml-44 sm:mt-0 -mt-[212px] sm:z-0'
			} sm:z-0 sm:w-44 w-full transition-[margin] ease-in-out duration-500 items-center flex flex-col sm:border-r border-b sm:min-h-[92vh] bg-red-500 text-gray-200 font-medium text-lg opacity-95`}
		>
			<Link
				className="transition ease-out duration-300 w-full text-left p-3 hover:bg-red-600 border-b border-red-400"
				to="/dashboard/menu"
			>
				Cardápio
			</Link>
			<Link
				className="transition ease-out duration-300 w-full text-left p-3 hover:bg-red-600 border-b border-red-400"
				to="/dashboard/restaurant"
			>
				Restaurante
			</Link>
			<Link
				className="transition ease-out duration-300 w-full text-left p-3 hover:bg-red-600 border-b border-red-400"
				to="/dashboard/qr-code"
			>
				QR-Code
			</Link>
			<Link
				className="transition ease-out duration-300 w-full text-left p-3 hover:bg-red-600 border-b border-red-400"
				to="/dashboard/account"
			>
				Sua Conta
			</Link>
		</div>
	)
}

export default Sidebar
