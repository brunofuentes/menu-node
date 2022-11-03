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
				!showSidebar && '-ml-44'
			} w-44 transition-[margin] ease-in-out duration-500 items-center flex flex-col border-r sm:min-h-[92vh] bg-slate-500 text-gray-200 font-medium text-lg opacity-95`}
		>
			<Link
				className="transition ease-out duration-300 w-full text-left p-3 hover:bg-slate-600 border-b border-slate-400"
				to="/dashboard/menu"
			>
				Cardápio
			</Link>
			<Link
				className="transition ease-out duration-300 w-full text-left p-3 hover:bg-slate-600 border-b border-slate-400"
				to="/dashboard/restaurant"
			>
				Restaurante
			</Link>
			<Link
				className="transition ease-out duration-300 w-full text-left p-3 hover:bg-slate-600 border-b border-slate-400"
				to="/dashboard/qr-code"
			>
				QR-Code
			</Link>
		</div>
	)
}

export default Sidebar
