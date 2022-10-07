import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function AdminPageLayout() {
	return (
		<>
			<div className="relative">
				<Navbar />
			</div>
			<Outlet />
		</>
	)
}

export default AdminPageLayout
