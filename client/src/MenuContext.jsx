import { createContext, useState } from 'react'

const MenuContext = createContext()

export function MenuProvider({ children }) {
	const [restaurant, setRestaurant] = useState(null)
	const [menuItems, setMenuItems] = useState([])

	const getMenuRestaurantData = (slug) => {
		if (slug) {
			fetch(`/api/restaurants/${slug}`, {
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
					getMenuItemsData(data.restaurant.id)
				})
				.catch((err) => {
					console.error('Error fetching data ', err)
				})
		}
	}

	const getMenuItemsData = (id) => {
		if (id) {
			fetch(`/api/${id}/items`, {
				method: 'GET',
			})
				.then((res) => {
					if (res.ok) {
						return res.json()
					}
					throw res
				})
				.then((data) => {
					setMenuItems(data.items)
				})
				.catch((err) => {
					console.error('Error fetching data ', err)
				})
		}
	}

	return (
		<MenuContext.Provider
			value={{
				restaurant,
				menuItems,
				getMenuRestaurantData,
				getMenuItemsData,
			}}
		>
			{children}
		</MenuContext.Provider>
	)
}

export default MenuContext
