import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router'
import MenuData from './MenuData'
import RestaurantData from './RestaurantData'
import UserContext from '../../context/UserContext'

function Dashboard() {
	const { user } = useContext(UserContext)
	const token = sessionStorage.getItem('token')

	let navigate = useNavigate()

	useEffect(() => {
		fetch('/api/protected', {
			method: 'GET',
			headers: {
				Authorization: token,
			},
		})
			.then((res) => res.json())
			.then((data) => {})
			.catch((err) => {
				navigate('/login')
			})
	}, [navigate])

	return (
		<div>
			<div className="flex-col flex items-center justify-center text-3xl py-5">
				<h1>Dashboard</h1>
			</div>
			<div className="p-3">
				<RestaurantData />
				<MenuData />
			</div>
		</div>
	)
}

export default Dashboard
