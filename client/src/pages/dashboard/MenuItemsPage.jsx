import React from 'react'
import ItemsTable from '../../components/dashboard/ItemsTable'
import { Link } from 'react-router-dom'

function MenuItemsPage() {
	const restaurant_id = sessionStorage.getItem('restaurant_id')

	if (restaurant_id === 'null' || restaurant_id === 'undefined') {
		return (
			<div>
				Parece que você ainda não tem um restaurante cadastrado. Cadastre{' '}
				<span className="hover:underline hover:text-blue-600 font-bold">
					<Link to="/dashboard/restaurant">aqui</Link>
				</span>
			</div>
		)
	}

	return (
		<div>
			<ItemsTable />
		</div>
	)
}

export default MenuItemsPage
