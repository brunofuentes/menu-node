import { createContext, useContext, useState } from 'react'
import UserContext from './UserContext'
import { useNavigate } from 'react-router'

const RestaurantContext = createContext()

export function RestaurantProvider({ children }) {
	let navigate = useNavigate()
	const [restaurant, setRestaurant] = useState(null)
	const [items, setItems] = useState([])
	const [item, setItem] = useState(null)

	const getRestaurantData = () => {
		const restaurant_id = sessionStorage.getItem('restaurant_id')
		if (restaurant_id) {
			fetch(`/api/restaurants/ids/${restaurant_id}`, {
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

	const getMenuData = () => {
		const restaurant_id = sessionStorage.getItem('restaurant_id')
		if (restaurant_id) {
			fetch(`/api/${restaurant_id}/items`, {
				method: 'GET',
			})
				.then((res) => {
					if (res.ok) {
						return res.json()
					}
					throw res
				})
				.then((data) => {
					setItems(data.items)
				})
				.catch((err) => {
					console.error('Error fetching data ', err)
				})
		}
	}

	const getMenuItemData = (id) => {
		if (id) {
			fetch(`/api/items/${id}`, {
				method: 'GET',
			})
				.then((res) => {
					if (res.ok) {
						return res.json()
					}
					throw res
				})
				.then((data) => {
					setItem(data.item)
				})
				.catch((err) => {
					console.error('Error fetching data ', err)
				})
		}
	}

	const createMenuItem = (data) => {
		fetch('/api/items', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: data.name,
				description: data.description,
				price: data.price,
				section: data.section,
				imageUrl: data.imageUrl,
				categories: data.categories.split(',').map((x) => x.trim()),
				restaurant_id: sessionStorage.getItem('restaurant_id'),
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log('Success:', data)
				navigate('/dashboard')
			})
			.catch((err) => {
				console.error('Error:', err)
			})
	}

	const updateMenuItem = (data, item_id) => {
		fetch(`/api/items/${item_id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: data.name,
				description: data.description,
				price: data.price,
				section: data.section,
				imageUrl: data.imageUrl,
				categories: data.categories.split(',').map((x) => x.trim()),
				restaurant_id: sessionStorage.getItem('restaurant_id'),
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log('Success:', data)
				navigate('/dashboard')
			})
			.catch((err) => {
				console.error('Error:', err)
			})
	}

	const deleteMenuItem = (id) => {
		fetch(`/api/items/${id}`, {
			method: 'DELETE',
		})
			.then((res) => res.json())
			.then((data) => {
				console.log('Success:', data)
				navigate('/dashboard')
			})
			.catch((err) => {
				console.error('Error:', err)
			})
	}

	return (
		<RestaurantContext.Provider
			value={{
				restaurant,
				items,
				item,
				setItem,
				getRestaurantData,
				getMenuData,
				getMenuItemData,
				createMenuItem,
				updateMenuItem,
				deleteMenuItem,
			}}
		>
			{children}
		</RestaurantContext.Provider>
	)
}

export default RestaurantContext
