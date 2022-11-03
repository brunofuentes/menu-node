import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function PageLayout() {
	return (
		<>
			<Navbar />
			<section className="flex mx-auto flex-col sm:flex-row">
				<div className=" p-3 flex flex-col w-9/12 mx-auto">
					<Outlet />
				</div>
			</section>
		</>
	)
}

export default PageLayout
