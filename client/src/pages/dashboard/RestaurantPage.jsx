import React, { useContext } from 'react'
import RestaurantData from '../../components/dashboard/RestaurantData'
import EditRestaurantForm from '../../components/dashboard/EditRestaurantForm'
import UserContext from '../../context/UserContext'
import LoadingSpinner from '../../components/LoadingSpinner'

function RestaurantPage() {
	const { user } = useContext(UserContext)

	if (!user) return <LoadingSpinner />
	else if (!user?.restaurant_id)
		return (
			<div>
				<h1>Cadastrar restaurante:</h1>
				<EditRestaurantForm />
			</div>
		)
	return (
		<div>
			<RestaurantData restId={user?.restaurant_id} />
		</div>
	)
}

export default RestaurantPage
