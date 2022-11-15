import { useEffect, createContext, useState, useContext } from 'react'
import UserContext from './UserContext'

const RestaurantContext = createContext()

export function RestaurantProvider({ children }) {
	const { UpdateUser, user, setUser } = useContext(UserContext)

	const [restaurant, setRestaurant] = useState(null)
	const [items, setItems] = useState([])
	const [item, setItem] = useState(null)

	const GetRestaurantData = (restId) => {
		useEffect(() => {
			if (restId) {
				fetch(`/api/restaurants/ids/${restId}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
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
		}, [restId])
	}

	const GetMenuData = (restId) => {
		useEffect(() => {
			if (restId) {
				fetch(`/api/${restId}/items`, {
					method: 'GET',
				})
					.then((res) => {
						return res.json()
					})
					.then((data) => {
						setItems(data.items)
					})
					.catch((err) => {
						console.error('Error fetching data ', err)
					})
			}
		}, [restId])
	}

	const GetMenuItemData = (id) => {
		if (items) {
			setItem(items.find((item) => item.id === id))
		}
	}

	const CreateMenuItem = (data) => {
		fetch(`/api/items/${user.username}`, {
			method: 'POST',
			headers: {},
			body: data,
		})
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				setItems([...items, data.item])
			})
			.catch((err) => console.error(err))
	}

	const UpdateMenuItem = (data, item_id) => {
		fetch(`/api/items/${user.username}/${item_id}`, {
			method: 'PATCH',
			headers: {},
			body: data,
		})
			.then((res) => res.json())
			.then((data) => {
				setItems(items.map((item) => (item.id === data.item.id ? data.item : item)))
			})
			.catch((err) => console.log(err))
	}

	const DeleteMenuItem = (id) => {
		fetch(`/api/items/${id}`, {
			method: 'DELETE',
		})
			.then((res) => res.json())
			.then((data) => {
				setItems(items.filter((x) => x.id !== id))
			})
			.catch((err) => {
				console.error('Error:', err)
			})
	}

	const UpdateRestaurant = (data, restId) => {
		fetch(`/api/restaurants/${restId}`, {
			method: 'PATCH',
			headers: {},
			body: data,
		})
			.then((res) => res.json())
			.then((data) => {
				setRestaurant(data.restaurant)
			})
			.catch((err) => {
				console.error('Error: ', err)
			})
	}

	const CreateRestaurant = (data) => {
		fetch('/api/restaurants', {
			method: 'POST',
			headers: {},
			body: data,
		})
			.then((res) => res.json())
			.then((data) => {
				setRestaurant(data.restaurant)
				setUser({ ...user, restaurant_id: data.restaurant.id })
				UpdateUser({ ...user, restaurant_id: data.restaurant.id })
			})
			.catch((err) => console.error(err))
	}

	return (
		<RestaurantContext.Provider
			value={{
				restaurant,
				items,
				item,
				setItem,
				GetRestaurantData,
				UpdateRestaurant,
				CreateRestaurant,
				GetMenuData,
				GetMenuItemData,
				CreateMenuItem,
				UpdateMenuItem,
				DeleteMenuItem,
			}}
		>
			{children}
		</RestaurantContext.Provider>
	)
}

export default RestaurantContext
