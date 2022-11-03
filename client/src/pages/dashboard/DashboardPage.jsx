import React, { useEffect } from 'react'
import { useContext } from 'react'
import UserContext from '../../context/UserContext'

function DashboardPage() {
	const { user } = useContext(UserContext)

	return (
		<>
			<h1 className="text-3xl font-medium">Hello, {user?.firstName || user?.username}</h1>
		</>
	)
}

export default DashboardPage
