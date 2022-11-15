import React from 'react'
import { useContext } from 'react'
import UserContext from '../../context/UserContext'

function DashboardPage() {
	const { user } = useContext(UserContext)

	return (
		<>
			<h1 className="text-3xl font-medium">Olá, {user?.firstName || user?.username}</h1>
		</>
	)
}

export default DashboardPage
