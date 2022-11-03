import React, { useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import RestaurantContext from '../../context/RestaurantContext'
import LoadingSpinner from '../LoadingSpinner'

function RestaurantForm() {
	let navigate = useNavigate()

	const { restaurant, getRestaurantData } = useContext(RestaurantContext)
	useEffect(() => {
		getRestaurantData()
	}, [])

	useEffect(() => {
		const token = sessionStorage.getItem('token')
		fetch('/api/protected', {
			method: 'GET',
			headers: {
				Authorization: token,
			},
		})
			.then((res) => res.json())
			.then((data) => {})
			.catch((err) => {
				navigate('/login')
			})
	}, [navigate])

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onSubmit = (data) => {
		console.log(data)
		navigate('/dashboard')
	if (!restaurant) {
		return <LoadingSpinner />
	}

	return (
		<section className="text-sm w-1/2 mx-auto">
			<p className="text-xl font-bold text-center p-2">Restaurant Details</p>
			<div className="max-w-md w-full mx-auto bg-white p-2">
				<form onSubmit={handleSubmit(onSubmit)} action="" className="space-y-6">
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Cover Photo
						</label>
						<input
							{...register('imageUrl')}
							style={{ borderColor: errors.imageUrl ? 'red' : '' }}
							// defaultValue={restaurant?.imageUrl}
							type="file"
							className=" w-full p-2 mt-1"
						></input>
						{errors.imageUrl}
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Restaurant Name
						</label>
						<input
							{...register('name', {
								required: true,
							})}
							style={{ borderColor: errors.name ? 'red' : '' }}
							defaultValue={restaurant?.name}
							type="text"
							className="border-gray-300 rounded w-full p-2 border mt-1"
						></input>
						{errors.name && <span className="text-sm">Restaurant Name is Required</span>}
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Description
						</label>
						<textarea
							{...register('description', {
								maxLength: 140,
							})}
							style={{ borderColor: errors.description ? 'red' : '' }}
							defaultValue={restaurant?.description}
							rows="3"
							type="text"
							className="border-gray-300 rounded w-full p-2 border mt-1"
						></textarea>
						{errors.description && <span>Description is too long</span>}
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Address
						</label>
						<input
							{...register('address', {
								maxLength: 140,
							})}
							style={{ borderColor: errors.address ? 'red' : '' }}
							defaultValue={restaurant?.address}
							type="text"
							className="border-gray-300 rounded w-full p-2 border mt-1"
						></input>
						{errors.address}
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Phone
						</label>
						<input
							{...register('phone', {
								maxLength: 140,
							})}
							style={{ borderColor: errors.address ? 'red' : '' }}
							defaultValue={restaurant?.phone}
							type="text"
							className="border-gray-300 rounded w-full p-2 border mt-1"
						></input>
						{errors.phone}
					</div>

					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Website Link
						</label>
						<input
							{...register('websiteUrl')}
							style={{ borderColor: errors.websiteUrl ? 'red' : '' }}
							defaultValue={restaurant?.websiteUrl}
							type="text"
							className="border-gray-300 rounded w-full p-2 border mt-1"
						></input>
						{errors.websiteUrl}
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Instagram Link
						</label>
						<input
							{...register('instagramUrl')}
							style={{ borderColor: errors.instagramUrl ? 'red' : '' }}
							defaultValue={restaurant?.instagramUrl}
							type="text"
							className="border-gray-300 rounded w-full p-2 border mt-1"
						></input>
						{errors.instagramUrl}
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Facebook Link
						</label>
						<input
							{...register('facebookUrl')}
							style={{ borderColor: errors.facebookUrl ? 'red' : '' }}
							defaultValue={restaurant?.facebookUrl}
							type="text"
							className="border-gray-300 rounded w-full p-2 border mt-1"
						></input>
						{errors.facebookUrl}
					</div>
					<div>
						<button
							type="submit"
							className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default RestaurantForm
