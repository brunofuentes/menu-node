import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserContext = createContext()

export function UserProvider({ children }) {
	const navigate = useNavigate()

	const [user, setUser] = useState(null)
	const [isLogged, setIsLogged] = useState(false)
	const [showSidebar, setShowSidebar] = useState(true)

	const LoginUser = (data) => {
		fetch(`/api/sign-in`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: data.email,
				password: data.password,
			}),
		})
			.then((res) => {
				if (res.ok) {
					return res.json()
				}
				throw res
			})
			.then((data) => {
				if (data.success) {
					sessionStorage.setItem('token', data.token)
					setUser(data.user)
					navigate('/dashboard')
				}
				return { message: data.message }
			})
			.catch((err) => {
				console.log(err)
				navigate('/login')
			})
	}

	const logoutUser = () => {
		sessionStorage.clear()
		setIsLogged(() => false)
	}

	const AuthenticateUser = () => {
		const token = sessionStorage.getItem('token')

		useEffect(() => {
			fetch(`/api/protected`, {
				method: 'GET',
				headers: {
					Authorization: token,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.success) {
						setIsLogged(true)
						setUser(data.user)
					}
				})
				.catch((err) => {
					setIsLogged(false)
					sessionStorage.clear()
					navigate('/login')
					console.error('Error: ' + err)
				})
		}, [token])
	}

	const UpdateUser = (data) => {
		fetch(`/api/users/${data.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				username: data.username,
				restaurant_id: data.restaurant_id,
			}),
		})
			.then((res) => {
				if (res.ok) {
					return res.json()
				}
				throw res
			})
			.then((data) => {
				if (data.success) {
					sessionStorage.setItem('token', data.token)
					setUser(data.user)
				}
				return { message: data.message }
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<UserContext.Provider
			value={{
				isLogged,
				user,
				setUser,
				logoutUser,
				showSidebar,
				setShowSidebar,
				AuthenticateUser,
				LoginUser,
				UpdateUser,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
