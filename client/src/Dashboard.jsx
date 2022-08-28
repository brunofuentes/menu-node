import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

function Dashboard() {
	let navigate = useNavigate()
	useEffect(() => {
		const token = localStorage.getItem('token')
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
	})

	return (
		<div className="min-h-screen flex items-center justify-center text-3xl font-bold font-mono">
			<h1>Dashboard Page! (Protected)</h1>
		</div>
	)
}

export default Dashboard
