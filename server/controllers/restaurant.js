const Restaurant = require('../models').Restaurant

module.exports = {
	createRest: async (req, res) => {
		let { name, description, slug, address, phone, imageUrl, websiteUrl, instagramUrl, facebookUrl } = req.body
		try {
			let newRestaurant = await Restaurant.create({
				name,
				description,
				slug,
				address,
				phone,
				imageUrl,
				websiteUrl,
				instagramUrl,
				facebookUrl,
			})
			return res.status(201).json({
				message: 'Restaurant created successfully',
				newRestaurant,
			})
		} catch (err) {
			return res.status(500).json({ err })
		}
	},

	getAllRestaurants: async (req, res) => {
		try {
			let restaurants = await Restaurant.findAll({
				attributes: ['id', 'name', 'description', 'slug', 'address', 'phone', 'imageUrl', 'websiteUrl', 'instagramUrl', 'facebookUrl'],
				limit: 10,
				order: [['id', 'DESC']],
			})
			if (restaurants) {
				return res.status(200).json({ restaurants })
			}
		} catch (err) {
			return res.status(400).json({ err })
		}
	},

	getRestaurantById: async (req, res) => {
		let id = req.params.id
		try {
			let restaurant = await Restaurant.findByPk(id)
			if (restaurant) {
				return res.status(200).json({ restaurant })
			}
		} catch (err) {
			return res.status(400).json({ err })
		}
	},

	getRestaurantbySlug: async (req, res) => {
		let slug = req.params.slug
		console.log(slug)
		try {
			let restaurant = await Restaurant.findOne({
				where: { slug: slug },
			})
			if (restaurant) {
				return res.status(200).json({ restaurant })
			}
		} catch (err) {
			return res.status(400).json({ err })
		}
	},

	deleteRestaurant: async (req, res) => {
		let id = req.params.id
		try {
			let restaurant = await Restaurant.destroy({
				where: { id: id },
			})
			if (restaurant) {
				return res.status(200).json({
					message: 'Restaurant Deleted successfully',
					restaurant,
				})
			}
		} catch (err) {
			return res.status(400).json({ err })
		}
	},
}
