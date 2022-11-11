import React, { useContext } from 'react'
import ItemsTable from '../../components/dashboard/ItemsTable'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import LoadingSpinner from '../../components/LoadingSpinner'

function MenuItemsPage() {
	const { user } = useContext(UserContext)

	if (!user) {
		return <LoadingSpinner />
	} else if (!user?.restaurant_id) {
		return (
			<div>
				Parece que você ainda não tem um restaurante cadastrado. Cadastre{' '}
				<span className="hover:underline hover:text-blue-600 font-bold">
					<Link to="/dashboard/restaurant">aqui</Link>
				</span>
			</div>
		)
	} else {
		return (
			<div>
				<ItemsTable restId={user?.restaurant_id} />
			</div>
		)
	}
}

export default MenuItemsPage
