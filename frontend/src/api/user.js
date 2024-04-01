const API_URL = "http://localhost:3500";

// Registration
export async function registerUser(username, password) {
    try {
        const response = await fetch(API_URL + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error("Registration failed");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Login
export async function login(username, password) {
    try {
        const response = await fetch(API_URL + "/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Logout
export async function logout(token) {
    const response = await fetch(API_URL + "/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    // no need a body - server side is handling the logout
    // cleaning the cookies from refresh tokens
    if (!response.ok) {
        throw new Error("Logout failed");
    }

    return await response.json();
}

// fetch user details by token
export async function getUserByToken(token) {
    const response = await fetch(
        API_URL + "/by-token",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
    )

    if (!response.ok) {
        throw new Error("Failed to fetch user by token");
    }

    return await response.json()
}
