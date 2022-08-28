import React from 'react'
import Logout from './Logout'

function Navbar() {
	return (
		<nav className="relative text-white font-semibold font-mono text-xl bg-gray-600 flex items-center justify-between py-5">
			<div className="mx-2 sm:mx-5">
				<a href="/">Menu App</a>
			</div>
			<div className="flex mx-2 sm:mx-5">
				<a href="/login" className="px-2">
					Login
				</a>
			</div>
		</nav>
	)
}

export default Navbar
