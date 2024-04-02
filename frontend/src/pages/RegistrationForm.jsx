import { useState } from "react";
import { registerUser } from "../api/user";
import { Link, useNavigate } from "react-router-dom";

export default function RegistrationForm() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    // handle submit
    const onSubmit = async (e) => {
        e.preventDefault();

        if (!/[a-zA-Z0-9]{1,32}/.test(formData.username)) {
            return;
        }

        if (!/[a-zA-Z0-9]{6,24}/.test(formData.password)) {
            return;
        }

        try {
            await registerUser(formData.username, formData.password);
            navigate("/auth");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div>
                <form onSubmit={onSubmit}>
                    <div>
                        <h1>Register Now!</h1>
                        <p>
                            Welcome! Please enter your details to sign up
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
                            <button type="submit">Register</button>
                        </div>
                        <span>
                            Already registered? <Link to="/auth">Sign In!</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}
