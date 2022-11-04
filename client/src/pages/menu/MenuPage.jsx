import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import MenuContext from '../../context/MenuContext'
import DynamicNavbar from '../../components/menu/DynamicNavbar'
import LoadingSpinner from '../../components/LoadingSpinner'

function Menu() {
	const { slug } = useParams()
	const { restaurant, menuItems, GetMenuRestaurantData } = useContext(MenuContext)

	GetMenuRestaurantData(slug)

	let sections = []
	menuItems.map((item) => (sections.includes(item.section) ? null : sections.push(item.section)))

	if (sections.length < 1) {
		return <LoadingSpinner />
	} else {
		return (
			<main className="sm:w-1/2 mx-auto">
				<section id="restaurant-header" className="w-full mx-auto">
					<img
						src={restaurant?.imageUrl}
						className="object-fill w-full max-h-80 mx-auto"
						alt="Restaurant Cover"
					/>
					<div className="mx-auto max-w-2xl px-3 py-8">
						<h1 className="font-bold text-4xl">{restaurant?.name}</h1>
						<p>{restaurant?.description}</p>
					</div>
				</section>
				<DynamicNavbar />
				{sections.map((section, section_index) => {
					return (
						<section className="px-3" key={section_index}>
							<h2 id={section.replace(' ', '-').toLowerCase()} className="font-bold text-2xl mt-4 pt-4">
								{section}
							</h2>
							<div>
								{menuItems.map(
									(item, item_index) =>
										item.section === section && (
											<div key={item_index} className="flex border-t pt-4">
												<div className="mr-auto flex flex-col pr-3">
													<p className="font-medium text-lg pb-2">{item.name}</p>
													<p className="py-1">{item.description}</p>
													<p>
														{item.categories.map((category, cat_index) => (
															<span
																key={cat_index}
																className="mx-1 text-sm bg-yellow-100 "
															>
																<small>{category}</small>
															</span>
														))}
													</p>
													<p>R${item.price}</p>
												</div>
												<img
													className="h-24 w-40 flex-none rounded object-cover"
													src={item.imageUrl}
													alt={item.name}
												/>
											</div>
										)
								)}
							</div>
						</section>
					)
				})}
				<section className="px-3 pb-5">
					<div className="text-center text-gray-500 border-t">
						<p className=" mt-5 py-2">
							{' '}
							Como podemos melhorar? Deixe-nos uma sugestão{' '}
							<a className="underline" href="/">
								aqui
							</a>
						</p>
						<div className="flex justify-center my-1">
							<a className="px-1" href={restaurant?.instagramUrl}>
								<img src="/images/icons/instagram_icon.svg" alt="Link to Instagram" />
							</a>
							<a className="px-1" href={restaurant?.facebookUrl}>
								<img src="/images/icons/facebook_icon.svg" alt="Link to Facebook" />
							</a>
						</div>
						<p className="py-1">
							Feito com ❤️ por{' '}
							<a href="https://menuonline.app" target="_blank" rel="noreferrer">
								menuonline.app
							</a>
						</p>
						<p className="py-1">Copyright ⓒ {new Date().getFullYear()}</p>
					</div>
				</section>
			</main>
		)
	}
}

export default Menu
