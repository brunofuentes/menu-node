import React, { useContext } from 'react'
import ItemsTable from '../../components/dashboard/ItemsTable'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import LoadingSpinner from '../../components/LoadingSpinner'
import useGetItemsData from '../../data/use-get-items-data'
import api from '../../services/api'

function MenuItemsPage() {
	const { user } = useContext(UserContext)
	const { data, refetch } = useGetItemsData(user?.restaurant_id)

	function handleDeleteItem(itemId) {
		api.deleteMenuItem(itemId).then(() => {
			refetch()
		})
	}

	if (!user) {
		return <LoadingSpinner />
	}

	if (!user?.restaurant_id) {
		return (
			<div>
				Parece que você ainda não tem um restaurante cadastrado. Cadastre{' '}
				<span className="hover:underline hover:text-blue-600 font-bold">
					<Link to="/dashboard/add-restaurant">aqui</Link>
				</span>
			</div>
		)
	}

	return (
		<div>
			<ItemsTable items={data.items} onDeleteItem={handleDeleteItem} />
		</div>
	)
}

export default MenuItemsPage
