const Restaurant = require('../models').Restaurant
const { deleteImageS3 } = require('../config/aws')

module.exports = {
	createRest: async (req, res) => {
		const { name, description, slug, address, phone, imageUrl, websiteUrl, instagramUrl, facebookUrl } = req.body
		const upload_url = req.file ? req.file.location : '/images/item_placeholder.png'

		try {
			let restaurant = await Restaurant.create({
				name,
				description,
				slug,
				address,
				phone,
				imageUrl: upload_url,
				websiteUrl,
				instagramUrl,
				facebookUrl,
			})
			return res.status(201).json({
				message: 'Restaurant created successfully',
				restaurant,
			})
		} catch (err) {
			return res.status(500).json({ err })
		}
	},

	updateRest: async (req, res) => {
		const id = req.params.id
		const { name, description, slug, address, phone, imageUrl, websiteUrl, instagramUrl, facebookUrl } = req.body
		const upload_url = req.file ? req.file.location : imageUrl

		try {
			const restaurant = await Restaurant.findOne({
				where: { id: id },
			})
			if (restaurant) {
				if (upload_url !== imageUrl) {
					//check here before proceeding!!
					deleteImageS3(restaurant)
				}
				restaurant.update({
					name,
					description,
					slug,
					address,
					phone,
					imageUrl: upload_url,
					websiteUrl,
					instagramUrl,
					facebookUrl,
				})
				return res.status(202).json({
					message: 'Restaurant updated successfully',
					restaurant,
				})
			} else {
				return res.status(404).json({
					message: 'Restaurant not found',
				})
			}
		} catch (err) {
			return res.status(400).json({ err })
		}
	},

	getAllRestaurants: async (req, res) => {
		try {
			let restaurants = await Restaurant.findAll({
				attributes: [
					'id',
					'name',
					'description',
					'slug',
					'address',
					'phone',
					'imageUrl',
					'websiteUrl',
					'instagramUrl',
					'facebookUrl',
				],
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
				})
			}
		} catch (err) {
			return res.status(400).json({ err })
		}
	},
}
