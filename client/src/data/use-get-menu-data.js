import { useState, useEffect, useCallback } from 'react'
import api from '../services/api'

const useGetMenuData = (slug) => {
	const [data, setData] = useState({ restaurant: {}, items: [] })

	const refetch = useCallback(() => {
		if (slug) {
			api.getMenuData(slug)
				.then((data) => {
					setData(data)
				})
				.catch((err) => {
					console.error('Error fetching data ', err)
				})
		}
	}, [slug])

	useEffect(refetch, [refetch])

	return { data, refetch }
}

export default useGetMenuData
