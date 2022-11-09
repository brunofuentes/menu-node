import React from 'react'

function MenuItem(props) {
	const { item } = props

	return (
		<div className="border-t border-gray-300 mt-2">
			<div className="flex justify-between">
				<span className="font-medium text-lg">{item.name}</span>
			</div>
			<div className="flex">
				<div className="mr-auto flex flex-col pr-3">
					<p className="py-1 text-xs">{item.description}</p>
					<span>R${item.price}</span>
					<p>
						{item?.categories?.map(
							(category, cat_index) =>
								category.length > 1 && (
									<span key={cat_index} className="mx-1 text-sm bg-yellow-100 px-0.5 rounded-md">
										<small>{category}</small>
									</span>
								)
						)}
					</p>
				</div>
				<div className="flex flex-none items-center justify-center">
					<img
						height="24"
						width="40"
						className="h-24 w-40 rounded object-cover"
						src={item.imageUrl}
						alt={item.name}
					/>
				</div>
			</div>
		</div>
	)
}

export default MenuItem
