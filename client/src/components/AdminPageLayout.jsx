import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './dashboard/Sidebar'
import { useContext } from 'react'
import UserContext from '../context/UserContext'

function AdminPageLayout() {
	const { AuthenticateUser } = useContext(UserContext)

	AuthenticateUser()

	return (
		<>
			<Navbar />
			<section className="flex mx-auto flex-col sm:flex-row">
				<Sidebar />
				<div className=" p-3 flex flex-col  w-11/12 sm:w-9/12 mx-auto">
					<Outlet />
				</div>
			</section>
		</>
	)
}

export default AdminPageLayout
