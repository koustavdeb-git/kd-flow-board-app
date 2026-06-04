import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../services/supabase";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        const { error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });

        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }

        navigate("/dashboard");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                <h1 className="mb-2 text-center text-3xl font-bold">
                    Welcome Back
                </h1>

                <p className="mb-6 text-center text-gray-500">
                    Sign in to KD FlowBoard
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-500"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-medium text-blue-600"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;