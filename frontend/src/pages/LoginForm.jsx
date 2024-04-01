import { useState } from "react";
import { useAuth } from "../hooks/auth";

export default function LoginForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const { login } = useAuth();

    // handle submit
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.username, formData.password);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div>
                <form onSubmit={onSubmit}>
                    <div>
                        <h1>Login Now!</h1>
                        <p>
                            Welcome back! Please enter your details to sign in
                            and start your session!
                        </p>
                        <div>
                            <label>
                                <span>Username</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Username"
                                value={formData.username}
                                onChange={(e) =>
                                    setFormData((prevForm) => {
                                        return {
                                            ...prevForm,
                                            username: e.target.value,
                                        };
                                    })
                                }
                                required
                            />
                        </div>
                        <div>
                            <label>
                                <span>Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData((prevForm) => {
                                        return {
                                            ...prevForm,
                                            password: e.target.value,
                                        };
                                    })
                                }
                                required
                            />
                        </div>
                        <div>
                            <button type="submit">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
