import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import RestaurantContext from '../../context/RestaurantContext'

function MenuItemForm() {
	const { item, createMenuItem, updateMenuItem } = useContext(RestaurantContext)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onSubmit = (data) => {
		if (item) {
			console.log(data)
			updateMenuItem(data, item.id)
		}
		if (!item) {
			createMenuItem(data)
		}
	}

	return (
		<section className="text-sm w-1/2 mx-auto">
			<p className="text-xl font-bold text-center p-2">Item Details</p>
			<div className="max-w-md w-full mx-auto bg-white p-2">
				<form onSubmit={handleSubmit(onSubmit)} key={item?.id} className="space-y-6">
					<div className="flex gap-2">
						<div>
							<p className="text-sm font-bold text-gray-600 block">Current Image:</p>
							<img className="rounded" height="250px" width="250px" src={item?.imageUrl} alt="" />
						</div>
						<div>
							<label htmlFor="" className="text-sm font-bold text-gray-600 block">
								Change current image:
							</label>
							<input
								{...register('imageUrl')}
								style={{ borderColor: errors.imageUrl ? 'red' : '' }}
								defaultValue={item?.imageUrl}
								className="border-gray-300 rounded w-full p-2 border mt-1"
								type="url"
							></input>
							{errors.imageUrl}
						</div>
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Section
						</label>
						<input
							{...register('section', {
								required: true,
							})}
							style={{ borderColor: errors.section ? 'red' : '' }}
							defaultValue={item?.section}
							type="text"
							className="border-gray-300 rounded w-full p-2 border mt-1"
						></input>
						{errors.section && <span className="text-sm">Item Section is Required</span>}
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Item Name
						</label>
						<input
							{...register('name', {
								required: true,
							})}
							style={{ borderColor: errors.name ? 'red' : '' }}
							defaultValue={item?.name}
							type="text"
							className="border-gray-300 rounded w-full p-2 border mt-1"
						></input>
						{errors.name && <span className="text-sm">Item Name is Required</span>}
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Item Description
						</label>
						<input
							{...register('description', {
								required: true,
							})}
							style={{ borderColor: errors.description ? 'red' : '' }}
							defaultValue={item?.description}
							type="text"
							className="border-gray-300 rounded w-full p-2 border mt-1"
						></input>
						{errors.description && <span className="text-sm">Item Description is Required</span>}
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Item Price
						</label>
						<input
							{...register('price', {
								required: true,
							})}
							style={{ borderColor: errors.price ? 'red' : '' }}
							defaultValue={item?.price}
							type="text"
							className="border-gray-300 rounded w-full p-2 border mt-1"
						></input>
						{errors.price && <span className="text-sm">Item Price is Required</span>}
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Item Categories
						</label>
						<input
							{...register('categories')}
							style={{ borderColor: errors.categories ? 'red' : '' }}
							defaultValue={item?.categories.join()}
							type="text"
							className="border-gray-300 rounded w-full p-2 border mt-1"
						></input>
						{errors.categories && <span className="text-sm">Item categories is Required</span>}
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

export default MenuItemForm
