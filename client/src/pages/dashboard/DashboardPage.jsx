import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ItemsTable from '../../components/dashboard/ItemsTable'
import QRCodeData from '../../components/dashboard/QRCodeData'
import RestaurantData from '../../components/dashboard/RestaurantData'

function DashboardPage() {
	const navigate = useNavigate()
	const token = sessionStorage.getItem('token')

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
				console.error('Error: ' + err)
			})
	}, [token, navigate])

	return (
		<div className="w-4/5 mx-auto">
			<div className="flex-col flex items-center justify-center text-3xl py-5">
				<h1>Dashboard</h1>
			</div>
			<div className="text-center font-md"></div>
			<div className="p-3 flex">
				<RestaurantData />
				<QRCodeData />
			</div>
			<ItemsTable />
		</div>
	)
}

export default DashboardPage
