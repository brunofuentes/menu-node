import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import QRCodeData from '../../components/dashboard/QRCodeData'
import LoadingSpinner from '../../components/LoadingSpinner'

function QRCodePage() {
	const { user } = useContext(UserContext)

	if (!user) return <LoadingSpinner />
	else if (!user?.restaurant_id)
		return (
			<div>
				Parece que você ainda não tem um restaurante cadastrado. Cadastre{' '}
				<Link to="/dashboard/restaurant">aqui</Link>
			</div>
		)
	return (
		<div>
			<QRCodeData restId={user?.restaurant_id} />
		</div>
	)
}

export default QRCodePage
