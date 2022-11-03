import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserContext = createContext()

export function UserProvider({ children }) {
	let userLS = {
		token: sessionStorage.getItem('token'),
		id: sessionStorage.getItem('id'),
		username: sessionStorage.getItem('username'),
		firstName: sessionStorage.getItem('firstName'),
		lastName: sessionStorage.getItem('lastName'),
		restaurant_id: sessionStorage.getItem('restaurant_id'),
	}

	const [user, setUser] = useState(userLS || null)
	const [isLogged, setIsLogged] = useState(false)
	const [showSidebar, setShowSidebar] = useState(true)

	let navigate = useNavigate()

	const SaveUserInfo = (user_data) => {
		sessionStorage.setItem('token', user_data.token)
		sessionStorage.setItem('id', user_data.id)
		sessionStorage.setItem('username', user_data.username)
		sessionStorage.setItem('firstName', user_data.firstName)
		sessionStorage.setItem('lastName', user_data.lastName)
		sessionStorage.setItem('restaurant_id', user_data.restaurant_id)
		setUser(user_data)
	}

	const logoutUser = () => {
		sessionStorage.clear()
		setIsLogged(() => false)
	}

	const AuthenticateUser = () => {
		const token = user?.token

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
					}
				})
				.catch((err) => {
					setIsLogged(false)
					console.error('Error: ' + err)
				})
		}, [token])
	}

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
			.then((res) => res.json())
			.then((user) => {
				if (user.success) {
					SaveUserInfo(user)
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
		<UserContext.Provider
			value={{
				isLogged,
				user,
				SaveUserInfo,
				logoutUser,
				showSidebar,
				setShowSidebar,
				AuthenticateUser,
				LoginUser,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
