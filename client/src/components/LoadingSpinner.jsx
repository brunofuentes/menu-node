import React from 'react'

const spinnerBorder = {
	verticalAlign: '-0.125em',
	border: '0.25em solid',
	borderRightColor: 'transparent',
}

function LoadingSpinner() {
	return (
		<div className="flex flex-col justify-center items-center min-h-screen">
			<div
				style={spinnerBorder}
				className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-zinc-400"
				role="status"
			>
				<span className="invisible">Loading...</span>
			</div>
		</div>
	)
}

export default LoadingSpinner
