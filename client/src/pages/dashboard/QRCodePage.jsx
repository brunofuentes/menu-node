import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import QRCodeData from '../../components/dashboard/QRCodeData'
import LoadingSpinner from '../../components/LoadingSpinner'

function QRCodePage() {
	const { user } = useContext(UserContext)

	if (!user) return <LoadingSpinner />
	if (!user?.restaurant_id)
		return (
			<div>
				Parece que você ainda não tem um restaurante cadastrado. Cadastre{' '}
				<span className="hover:underline hover:text-blue-600 font-bold">
					<Link to="/dashboard/add-restaurant">aqui</Link>
				</span>
			</div>
		)
	return (
		<div>
			<QRCodeData restId={user?.restaurant_id} />
		</div>
	)
}

export default QRCodePage
