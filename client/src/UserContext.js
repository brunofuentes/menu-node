import { createContext, useState, useEffect } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
	const [user, setUser] = useState(null)
	const [isLogged, setIsLogged] = useState(false)

	const saveUserInfo = (user_data) => {
		setUser(() => user_data)
		sessionStorage.setItem('token', user.token)
		sessionStorage.setItem('id', user.id)
		sessionStorage.setItem('username', user.username)
		sessionStorage.setItem('restaurant_id', user.restaurant_id)
	}

	const GetUserStatus = () => {
		const token = sessionStorage.getItem('token')
		useEffect(() => {
			if (token) {
				setIsLogged(true)
			} else {
				setIsLogged(false)
			}
		})
	}

	const logoutUser = () => {
		sessionStorage.clear()
		setIsLogged(() => false)
	}

	return <UserContext.Provider value={{ isLogged, user, saveUserInfo, GetUserStatus, logoutUser }}>{children}</UserContext.Provider>
}

export default UserContext
