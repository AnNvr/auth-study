import { useAuth } from "../hooks/auth"

export default function Dashboard() {
    const { authUser } = useAuth();
    return (
        <h1>
            {authUser ? `Hi ${authUser.username}! You have logged in successfully!` : "Not logged in"}
        </h1>
    );
}
