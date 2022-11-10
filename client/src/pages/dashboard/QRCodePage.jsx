import React from 'react'
import { Link } from 'react-router-dom'

function QRCodePage() {
	const restaurant_id = sessionStorage.getItem('restaurant_id')

	if (restaurant_id === 'null' || restaurant_id === 'undefined') {
		return (
			<div>
				Parece que você ainda não tem um restaurante cadastrado. Cadastre{' '}
				<Link to="/dashboard/restaurant">aqui</Link>
			</div>
		)
	}

	return <div></div>
}

export default QRCodePage
