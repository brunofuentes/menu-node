import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router'
import RestaurantContext from '../../context/RestaurantContext'

function RestaurantData() {
	const navigate = useNavigate()
	const { restaurant, getRestaurantData } = useContext(RestaurantContext)
	useEffect(() => {
		getRestaurantData()
	}, [])

	function handleClickEdit() {
		navigate('/dashboard/edit-restaurant')
	}

	return (
		<div className="mx-3 border max-w-fit rounded relative">
			{restaurant ? (
				<div>
					<div className="flex justify-between p-2">
						<span className="text-lg font-semibold p-2">Restaurant Info</span>
						<span className="flex">
							<button onClick={handleClickEdit}>
								<img height="24px" width="24px" src="/images/icons/settings.svg" alt="edit"></img>
							</button>
						</span>
					</div>
					<div className="max-w-sm p-2">
						<ul>
							<li>
								<span className="font-semibold">Cover Photo:</span>
								<div>
									<img className="rounded" height="250px" width="250px" src={restaurant?.imageUrl} alt="Restaurant Cover"></img>
								</div>
							</li>
							<li>
								<span className="font-semibold">Name: </span>
								{restaurant?.name}
							</li>
							<li>
								<span className="font-semibold">Description: </span>
								{restaurant?.description}
							</li>
							<li>
								<span className="font-semibold">Slug: </span>
								{restaurant?.slug}
							</li>
							<li>
								<span className="font-semibold">Address: </span>
								{restaurant?.address}
							</li>
							<li>
								<span className="font-semibold">Phone: </span>
								{restaurant?.phone}
							</li>
							<li>
								<span className="font-semibold">Website: </span>
								{restaurant?.websiteUrl}
							</li>
							<li>
								<span className="font-semibold">Instagram: </span>
								{restaurant?.instagramUrl}
							</li>
							<li>
								<span className="font-semibold">Facebook: </span>
								{restaurant?.facebookUrl}
							</li>
						</ul>
					</div>
				</div>
			) : (
				<div>Hellow</div>
			)}
		</div>
	)
}

export default RestaurantData
