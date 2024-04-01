import { useAuth } from "../hooks/auth"

export default function Dashboard () {
    const { authUser } = useAuth()
    return <h1>{`Hi ${authUser}! You have logged in successfully!`}</h1>
}