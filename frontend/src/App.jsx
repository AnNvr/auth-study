import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./hooks/auth.jsx";
import LoginForm from "./pages/LoginForm";
import RegistrationForm from "./pages/RegistrationForm.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const AuthProviderWithNavigate = ({ children }) => {
    const navigate = useNavigate();
    return <AuthProvider navigate={navigate}>{children}</AuthProvider>;
};

export default function App() {
    return (
        <BrowserRouter>
            <AuthProviderWithNavigate>
                <Routes>
                    <Route path="/" element={<RegistrationForm />} />
                    <Route path="/auth" element={<LoginForm />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </AuthProviderWithNavigate>
        </BrowserRouter>
    );
}
