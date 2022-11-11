import React, { useContext } from 'react'
import RestaurantData from '../../components/dashboard/RestaurantData'
import UserContext from '../../context/UserContext'
import LoadingSpinner from '../../components/LoadingSpinner'

function RestaurantPage() {
	const { user } = useContext(UserContext)

	if (!user) return <LoadingSpinner />
	return (
		<div>
			<RestaurantData restId={user?.restaurant_id} />
		</div>
	)
}

export default RestaurantPage
