import { useState, useEffect, useCallback } from 'react'
import api from '../services/api'

const useGetItemsData = (restId) => {
	const [data, setData] = useState({ items: [], sections: [] })

	const refetch = useCallback(() => {
		if (restId) {
			api.getRestaurantItems(restId)
				.then((data) => {
					setData(data)
				})
				.catch((err) => {
					console.error('Error fetching data ', err)
				})
		}
	}, [restId])

	useEffect(refetch, [refetch])

	return { data, refetch }
}

export default useGetItemsData
