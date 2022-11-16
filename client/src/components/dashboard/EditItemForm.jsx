import React from 'react'
import { useForm } from 'react-hook-form'

function EditItemForm(props) {
	const { item, sections, onItemUpdate, onCreateItem } = props
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onSubmit = (data) => {
		const formData = new FormData()

		formData.append('section', data.section)
		formData.append('name', data.name)
		formData.append('description', data.description)
		formData.append('price', data.price)
		formData.append('categories', data.categories)
		formData.append('restaurant_id', props.restId)
		formData.append('file', data.file[0])

		if (item) {
			onItemUpdate(item.id, formData)
		}
		if (!item) {
			onCreateItem(formData)
		}
	}

	return (
		<section className="text-sm w-1/2 mx-auto">
			<p className="text-xl font-bold text-center p-2">Detalhes do Item</p>
			<div className="max-w-md w-full mx-auto bg-white p-2">
				<form
					onSubmit={handleSubmit(onSubmit)}
					key={item?.id}
					className="space-y-6"
					encType="multipart/form-data"
				>
					<div className="flex gap-2">
						<div>
							<p className="text-sm font-bold text-gray-600 block">Foto atual:</p>
							<img className="rounded" height="250px" width="250px" src={item?.imageUrl} alt="" />
						</div>
						<div>
							<label htmlFor="" className="text-sm font-bold text-gray-600 block">
								Trocar foto:
							</label>
							<input
								{...register('file')}
								style={{ borderColor: errors.imageUrl ? 'red' : '' }}
								accept="image/*"
								name="file"
								className="border-gray-300 rounded w-full p-2 border mt-1"
								type="file"
							></input>
						</div>
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Secção
						</label>
						<input
							{...register('section', {
								required: true,
							})}
							style={{ borderColor: errors.section ? 'red' : '' }}
							defaultValue={item?.section}
							type="text"
							list="existing-sections"
							className="border-gray-300 rounded w-full p-2 border mt-1"
						></input>
						<datalist id="existing-sections">
							{sections?.map((section) => (
								<option key={section} value={section}></option>
							))}
						</datalist>
						{errors.section && <span className="text-sm">Secção do item é obrigatoria.</span>}
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Nome do Item
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
						{errors.name && <span className="text-sm">Nome do Item é obrigatório.</span>}
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Descrição do Item
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
						{errors.description && <span className="text-sm">Descrição do Item é obrigatória.</span>}
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Preço
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
						{errors.price && <span className="text-sm">Preço é obrigatório</span>}
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Detalhes
						</label>
						<input
							{...register('categories')}
							style={{ borderColor: errors.categories ? 'red' : '' }}
							defaultValue={item?.categories?.join()}
							type="text"
							className="border-gray-300 rounded w-full p-2 border mt-1"
						></input>
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

export default EditItemForm
