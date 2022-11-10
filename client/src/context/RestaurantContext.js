import { useContext } from 'react'
import { useEffect, createContext, useState } from 'react'
import { useNavigate } from 'react-router'
import UserContext from './UserContext'

const RestaurantContext = createContext()

export function RestaurantProvider({ children }) {
	const navigate = useNavigate()

	const { UpdateUser, user } = useContext(UserContext)

	const [restaurant, setRestaurant] = useState(null)
	const [items, setItems] = useState([])
	const [item, setItem] = useState(null)

	const GetRestaurantData = () => {
		const restaurant_id = sessionStorage.getItem('restaurant_id')

		useEffect(() => {
			if (restaurant_id !== 'null') {
				fetch(`/api/restaurants/ids/${restaurant_id}`, {
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
		}, [restaurant_id])
	}

	const GetMenuData = () => {
		const restaurant_id = sessionStorage.getItem('restaurant_id')

		useEffect(() => {
			if (restaurant_id !== 'null') {
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
		}, [restaurant_id])
	}

	const GetMenuItemData = (id) => {
		if (items) {
			setItem(items.find((item) => item.id === id))
		}
	}

	const CreateMenuItem = (data) => {
		fetch('/api/items', {
			method: 'POST',
			headers: {},
			body: data,
		})
			.then((res) => {
				console.log(res)
				navigate('/dashboard/menu')
			})
			.catch((err) => console.error(err))
	}

	const UpdateMenuItem = (data, item_id) => {
		fetch(`/api/items/${item_id}`, {
			method: 'PATCH',
			headers: {},
			body: data,
		})
			.then((res) => {
				console.log(res)
				navigate('/dashboard/menu')
			})
			.catch((err) => console.log(err))
	}

	const DeleteMenuItem = (id) => {
		fetch(`/api/items/${id}`, {
			method: 'DELETE',
		})
			.then((res) => res.json())
			.then((data) => {
				console.log('Success:', data)
				navigate('/dashboard/menu')
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
