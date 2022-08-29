import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	let navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem('token')
		fetch('/api/protected', {
			method: 'GET',
			headers: {
				Authorization: token,
			},
		})
			.then((res) => res.json())
			.then((data) => navigate('/dashboard'))
			.catch((err) => {
				navigate('/login')
			})
	}, [navigate])

	function onSubmit(data) {
		fetch('/api/sign-in', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: data.email,
				password: data.password,
			}),
		})
			.then((res) => res.json())
			.then((user) => {
				if (user.success) {
					localStorage.setItem('token', user.token)
					navigate('/dashboard')
				}
				return { message: user.message }
			})
			.catch((err) => {
				console.log(err)
				navigate('/login')
			})
	}

	return (
		<div className="flex flex-col min-h-screen bg-gray-50 justify-center">
			<div className="max-w-md w-full mx-auto">
				<div className="text-xl font-medium text-center">Hi there,</div>
				<div className="text-3xl font-bold text-gray-900 mt-2 text-center">Welcome back!</div>
			</div>
			<div className="max-w-md w-full mx-auto mt-4 bg-white p-8 rounded border border-gray-300">
				<form onSubmit={handleSubmit(onSubmit)} action="" className="space-y-6">
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Email
						</label>
						<input
							{...register('email', {
								required: true,
								minLength: 6,
								maxLength: 100,
							})}
							style={{ borderColor: errors.email ? 'red' : '' }}
							type="text"
							className="w-full p-2 border border-gray-300 rounded mt-1"
						></input>
						{errors.email && <span>Email invalid</span>}
					</div>
					<div>
						<label htmlFor="" className="text-sm font-bold text-gray-600 block">
							Password
						</label>
						<input
							{...register('password', { required: true })}
							style={{
								borderColor: errors.password ? 'red' : '',
							}}
							type="password"
							className="w-full p-2 border border-gray-300 rounded mt-1"
						></input>
						{errors.password && <span>Invalid Password</span>}
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input type="checkbox" className="h-4 w-4 text-blue-300 rounded"></input>
							<label htmlFor="" className="ml-2 text-sm text-gray-600">
								Remember me
							</label>
						</div>
						<div>
							<a href="/" className="font-medium text-sm text-blue-500">
								Forgot Password
							</a>
						</div>
					</div>
					<div>
						<button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white">
							Submit
						</button>
					</div>
					<div className="text-center">
						<span>First time here? </span>
						<a href="/register" className="text-blue-500 font-medium">
							Register now.
						</a>
					</div>
				</form>
			</div>
		</div>
	)
}

export default LoginForm
