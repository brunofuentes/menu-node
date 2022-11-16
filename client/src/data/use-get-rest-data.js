import { useCallback, useState, useEffect } from 'react'
import api from '../services/api'

const useGetRestaurantData = (restId) => {
	const [restaurant, setRestaurant] = useState(null)

	const refetch = useCallback(() => {
		if (restId) {
			api.getRestaurantData(restId)
				.then((data) => {
					setRestaurant(data.restaurant)
				})
				.catch((err) => {
					console.error('Error fetching data', err)
				})
		}
	}, [restId])

	useEffect(refetch, [refetch])

	return { restaurant, refetch }
}

export default useGetRestaurantData
