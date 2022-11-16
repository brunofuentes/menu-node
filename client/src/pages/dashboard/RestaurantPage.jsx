import React, { useContext } from 'react'
import RestaurantData from '../../components/dashboard/RestaurantData'
import UserContext from '../../context/UserContext'
import LoadingSpinner from '../../components/LoadingSpinner'
import useGetRestaurantData from '../../data/use-get-rest-data'
import { Link } from 'react-router-dom'

function RestaurantPage() {
	const { user } = useContext(UserContext)

	const { restaurant } = useGetRestaurantData(user?.restaurant_id)


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
			<RestaurantData restaurant={restaurant} />
		</div>
	)
}

export default RestaurantPage
