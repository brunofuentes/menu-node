const api = {
	getRestaurantItems: async (restId) => {
		const { items } = await request.get(`/api/${restId}/items`)
		const sections = [...new Set(items.map((item) => item.section))]

		return { items, sections }
	},
	getRestaurantData: async (restId) => {
		return await request.get(`/api/restaurants/ids/${restId}`)
	},
	updateRestaurantData: async (restId, formData) => {
		await request.patchFormData(`/api/restaurants/${restId}`, formData)
	},
	createRestaurant: async (user, formData) => {
		const { restaurant } = await request.postFormData('/api/restaurants', formData)
		await request.patch(`/api/users/${user.id}`, { ...user, restaurant_id: restaurant.id })
	},

	getMenuData: async (slug) => {
		const { restaurant } = await request.get(`/api/restaurants/${slug}`)
		const { items } = await request.get(`/api/${restaurant.id}/items`)

		return { restaurant, items }
	},
	createMenuItem: async (user, formData) => {
		await request.postFormData(`/api/items/${user.username}`, formData)
	},
	updateMenuItem: async (itemId, username, formData) => {
		await request.patchFormData(`/api/items/${username}/${itemId}`, formData)
	},
	deleteMenuItem: async (itemId) => {
		await request.delete(`/api/items/${itemId}`)
	},

	updateUser: async (inputData) => {
		await request.patch(`/api/users/${inputData.id}`, inputData)
	},
}

const request = {
	get: async (url) => {
		const res = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const data = await res.json()
		return data
	},
	postFormData: async (url, formData) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {},
			body: formData,
		})
		const data = await res.json()
		return data
	},
	delete: async (url) => {
		const res = await fetch(url, { method: 'DELETE' })
		const data = await res.json()
		return data
	},
	patch: async (url, inputData) => {
		const res = await fetch(url, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(inputData),
		})
		const data = await res.json()
		return data
	},
	patchFormData: async (url, formData) => {
		const res = await fetch(url, { method: 'PATCH', headers: {}, body: formData })
		const data = await res.json()
		return data
	},
}

export default api
