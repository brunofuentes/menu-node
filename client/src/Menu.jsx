import React, { useContext } from 'react'
import { useEffect } from 'react'
import RestaurantContext from './RestaurantContext'

function Menu() {
	const { items, restaurant, getMenuData, getRestaurantData } = useContext(RestaurantContext)

	useEffect(() => {
		getMenuData()
		getRestaurantData()
	}, [])

	let sections = []
	items.map((item) => (sections.includes(item.section) ? null : sections.push(item.section)))

	return (
		<main>
			<section id="restaurant-header">
				<img src={restaurant.imageUrl} className="max-h-[450px] w-full object-cover" alt="Restaurant Cover" />
				<div className="mx-auto max-w-2xl px-4 py-8">
					<h1 className="font-bold text-4xl">{restaurant.name}</h1>
					<p>{restaurant.description}</p>
				</div>
			</section>
			{sections.map((section, section_index) => {
				return (
					<div className="sm:w-1/2 mx-auto" key={section_index}>
						<h2 className="font-bold text-2xl mt-4 pt-4">{section}</h2>
						<div>
							{items.map(
								(item, item_index) =>
									item.section === section && (
										<div key={item_index} className="flex border-t pt-4">
											<div className="mr-auto flex flex-col pr-4">
												<p>{item.name}</p>
												<p>{item.description}</p>
												<p>R${item.price}</p>
											</div>
											<div className="">
												<img className="h-24 w-40 flex-none rounded object-cover" src={item.imageUrl} alt={item.name} />
											</div>
										</div>
									)
							)}
						</div>
					</div>
				)
			})}
		</main>
	)
}

export default Menu
