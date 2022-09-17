import { createContext, useState } from 'react'

const RestaurantContext = createContext()

export function RestaurantProvider({ children }) {
	const [restaurant, setRestaurant] = useState(null)

	const getRestaurantData = () => {
		const restaurant_id = sessionStorage.getItem('restaurant_id')
		if (restaurant_id) {
			fetch(`/api/restaurants/${restaurant_id}`, {
				method: 'GET',
			})
				.then((res) => {
					if (res.ok) {
						return res.json()
					}
					throw res
				})
				.then((data) => {
					setRestaurant(data.restaurant)
				})
				.catch((err) => {
					console.error('Error fetching data ', err)
				})
		}
	}

	return <RestaurantContext.Provider value={{ restaurant, getRestaurantData }}>{children}</RestaurantContext.Provider>
}

export default RestaurantContext
