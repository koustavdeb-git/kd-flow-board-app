import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        
        if (formData.password.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            return;
        }
        setPasswordError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!formData.fullName.trim()) {
            setError("Name is required");
            return;
        }

        if (!formData.email.trim()) {
            setError("Email is required");
            return;
        }


        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    full_name: formData.fullName,
                },
            },
        });

        console.log("DATA:", data);
        console.log("ERROR:", error);

        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }

        navigate("/login");
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6">
            {/* Background Glow */}
            <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/10 blur-3xl" />

            {/* Register Container */}
            <div className="relative z-10 w-full max-w-md">
                {/* Branding */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-green-500">
                        KD FlowBoard
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Organize tasks. Track progress. Deliver faster.
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-3xl border border-slate-700 bg-black p-8 shadow-2xl backdrop-blur-xl">
                    <h2 className="mb-2 text-center text-3xl font-bold text-white">
                        Create Account
                    </h2>

                    <p className="mb-8 text-center text-slate-400">
                        Start managing your projects today
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Full Name <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Email <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Password <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create password"
                                minLength={6}
                                maxLength={20}
                                required
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                            />
                            <p className="mt-1 text-sm text-red-500">{passwordError}</p>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm password"
                                minLength={6}
                                maxLength={20}
                                required
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                {error}
                            </div>
                        )}

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="cursor-pointer w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition-all hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-green-500 transition hover:text-green-400"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;