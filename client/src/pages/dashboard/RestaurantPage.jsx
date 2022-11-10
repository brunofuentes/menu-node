import React from 'react'
import RestaurantData from '../../components/dashboard/RestaurantData'
import EditRestaurantForm from '../../components/dashboard/EditRestaurantForm'

function RestaurantPage() {
	const restaurant_id = sessionStorage.getItem('restaurant_id')

	if (restaurant_id === 'null' || restaurant_id === 'undefined') {
		return (
			<div>
				<h1>Cadastrar restaurante</h1>
				<EditRestaurantForm />
			</div>
		)
	}

	return (
		<div>
			<RestaurantData />
		</div>
	)
}

export default RestaurantPage
