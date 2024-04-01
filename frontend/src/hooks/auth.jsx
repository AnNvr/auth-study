import { createContext, useContext, useState, useEffect } from "react";
import {
    login as apiLogin,
    logout as apiLogout,
    getUserByToken
} from "../api/user"

const AuthContext = createContext()


export const AuthProvider = ({ children, navigate }) => {
    const [authUser, setAuthUser] = useState(null)
    const [token, setToken] = useState(null)

    // Attempt to retrieve and set the user's token
    useEffect(() => {
        if (authUser == null) {
            const storedToken = localStorage.getItem('token')
            if (storedToken) {
                getUserByToken(storedToken)
                .then(user => {
                    setAuthUser(user)
                })
                .catch(err => {
                    console.error("Error fetching user by token:", err)
                })
            }
        }
    }, [])

    async function login(username, password) {
        try {
            // ensure to clear existing session
            setAuthUser(null)
            setToken(null)

            // attempt login - the response must be equal to the res.json of the controller
            const { accessToken, roles } = await apiLogin(username, password)

            if (accessToken) {
                // Set the accessToken in state and localStorage for session
                setToken(accessToken)
                localStorage.setItem('token', accessToken)

                // fetch roles of the user
                setAuthUser({ username, roles })

                navigate('/dashboard')
            } else {
                console.error('Login failed: No access token received')
            }
        } catch (err) {
            console.error("Login error:", err);
        }
    }

    async function logout() {
        await apiLogout(token)
        setToken(null)
        setAuthUser(null)
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <AuthContext.Provider value={{ authUser, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
