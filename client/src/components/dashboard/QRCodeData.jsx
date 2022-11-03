import React, { useState, useContext } from 'react'
import QRCode from 'qrcode'
import RestaurantContext from '../../context/RestaurantContext'
import { useEffect } from 'react'
import LoadingSpinner from '../LoadingSpinner'

function QRCodeData() {
	const { restaurant, GetRestaurantData } = useContext(RestaurantContext)

	const url = `https://menu-node.vercel.app/${restaurant?.slug}/menu`
	const [qrcode, setQrcode] = useState(null)

	useEffect(() => {
		GetRestaurantData()
	}, [qrcode])

	const GenerateQRCode = () => {
		QRCode.toDataURL(
			url,
			{
				width: 300,
				margin: 2,
			},
			(err, url) => {
				if (err) return console.error(err)
				setQrcode(url)
			}
		)
	}

	if (!restaurant) {
		return <LoadingSpinner />
	}

	return (
		<div className="text-center mx-3 max-w-sm border rounded shadow-md">
			<div className="p-2">
				<p className="text-lg font-semibold p-2">Restaurant QR-Code</p>

				<div className="flex flex-col">
					{qrcode && (
						<>
							<p>QR-Code URL: </p>
							<a className="" href={url}>
								<small>{url}</small>
							</a>
							<div className="flex flex-col justify-center items-center">
								<img height="200px" width="200px" className="m-3" src={qrcode} alt="Menu QR-Code" />
							</div>
						</>
					)}
					<div>
						<button
							onClick={() => GenerateQRCode()}
							className="mx-1 bg-gray-800 rounded-lg p-2 hover:bg-gray-500 transition ease-out duration-300"
							href={qrcode}
							download="qrcode.png"
						>
							<div className="flex">
								<img
									className="invert"
									height="18px"
									width="18px"
									src="/images/icons/download_icon.svg"
									alt=""
								/>
								<span className="px-1 text-white">Generate</span>
							</div>
						</button>
						<a
							className={`${
								qrcode ? 'bg-gray-800' : 'pointer-events-none bg-gray-400'
							} mx-1 inline-block  rounded-lg p-2 hover:bg-gray-500 transition ease-out duration-300`}
							href={qrcode}
							download="qrcode.png"
						>
							<div className="flex">
								<img
									className="invert"
									height="18px"
									width="18px"
									src="/images/icons/download_icon.svg"
									alt=""
								/>
								<span className="px-1 text-white">Download</span>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default QRCodeData
