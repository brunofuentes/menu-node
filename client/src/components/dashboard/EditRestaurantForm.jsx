import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

function RestaurantForm(props) {
	const navigate = useNavigate()

	const { user, restaurant, onRestaurantUpdate, onCreateRestaurant } = props

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onSubmit = (data) => {
		const formData = new FormData()

		formData.append('name', data.name)
		formData.append('slug', data.slug)
		formData.append('description', data.description)
		formData.append('address', data.address)
		formData.append('phone', data.phone)
		formData.append('websiteUrl', data.websiteUrl)
		formData.append('instagramUrl', data.instagramUrl)
		formData.append('facebookUrl', data.facebookUrl)
		formData.append('file', data.file[0])

		if (restaurant) {
			onRestaurantUpdate(restaurant.id, formData)
		} else {
			onCreateRestaurant(user, formData)
		}
		navigate('/dashboard/restaurant')
	}

	return (
		<section className="text-sm mx-auto">
			<p className="text-xl font-bold text-center p-2">Detalhes do Restaurante</p>
			<div className="max-w-md w-full mx-auto bg-white p-2">
				<form onSubmit={handleSubmit(onSubmit)} action="" className="space-y-6" encType="multipart/form-data">
					<div className="flex gap-2">
						<div>
							<p className="text-sm font-bold text-gray-600 block">Foto de capa atual:</p>
							<img className="rounded" height="250px" width="250px" src={restaurant?.imageUrl} alt="" />
						</div>
						<div>
							<label htmlFor="" className="text-sm font-bold text-gray-600 block">
								Trocar foto de capa:
							</label>
							<input
								{...register('file')}
								style={{ borderColor: errors.imageUrl ? 'red' : '' }}
								type="file"
								name="file"
								accept="image/*"
								className="border-gray-300 rounded w-full p-2 border mt-1"
							></input>
						</div>
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Nome
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
						{errors.name && <span className="text-sm">Adicionar um nome é obrigatório.</span>}
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Slug (link único do seu restaurante)
						</label>
						<input
							{...register('slug', {
								required: true,
							})}
							style={{ borderColor: errors.slug ? 'red' : '' }}
							defaultValue={restaurant?.slug}
							type="text"
							className="border-gray-300 rounded w-full p-2 border mt-1"
						></input>
						{errors.slug && <span className="text-sm">Adicionar um nome é obrigatório.</span>}
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Descrição
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
						{errors.description && <span>Uma descrição é obrigatória.</span>}
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Endereço
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
							Telefone
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
							Página Web
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
							Página do Instagram
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
							Página do Facebook
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
							Salvar
						</button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default RestaurantForm
