import React from "react"

function Navbar() {
	return (
		<nav className="text-white font-semibold font-mono text-xl bg-gray-600 flex items-center justify-between py-5">
			<div className="mx-2 sm:mx-5">Menu App</div>
			<div className="flex mx-2 sm:mx-5">
				<a
					href="/"
					className="px-2">
					Login
				</a>
				<a
					href="/"
					className="px-2">
					Logout
				</a>
			</div>
		</nav>
	)
}

export default Navbar
