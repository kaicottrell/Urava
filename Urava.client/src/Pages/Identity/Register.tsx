import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from '../../Context/ToastContext';
import { toast } from 'react-toastify';

function Register() {
    // State variables for email and passwords
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const navigate = useNavigate();
    const { triggerToast } = useToast();
    const [error, setError] = useState("");

    const handleLoginClick = () => {
        navigate("/login");
    };

    // Handle change events for input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);
        if (name === "firstName") setFirstName(value);
        if (name === "lastName") setLastName(value);
    };

    // Handle submit event for the form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Validate email and passwords
        if (!firstName) {
            setError("First name is required.");
        } else if (!lastName) {
            setError("Last name is required.");
        } else if (!email) {
            setError("Email is required.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
        } else if (!password) {
            setError("Password is required.");
        } else if (password !== confirmPassword) {
            setError("Passwords do not match.");
        } else {
            setError("");
            // Post data to the /register api
            fetch("/api/account/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                }),
            })
                .then((data) => {
                    if (data.ok) {
                        triggerToast("Registration Successful, Please Log In");
                        navigate("/login");
                    } else {
                        toast.error('Error registering');
                        setError("Error registering.");
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setError("Error registering.");
                });
        }
    };

    return (
        <>
            <div className="flex justify-center mt-2">
                <img className="md:w-1/5 w-1/2" src="/assets/images/LogoV2.png" alt="Logo" />
            </div>

            <div className="flex justify-center">
                <div className="w-full max-w-sm lg:max-w-lg bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-center text-xl font-bold">Register</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium" htmlFor="firstName">First Name:</label>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded"
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium" htmlFor="lastName">Last Name:</label>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded"
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium" htmlFor="email">Email:</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium" htmlFor="password">Password:</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium" htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex justify-center space-x-2">
                            <button className="bg-primary text-white py-2 px-4 rounded" type="submit">Register</button>
                            <button className="border bg-secondary border-gray-600 text-gray-600 py-2 px-4 rounded" onClick={handleLoginClick}>Go to Login</button>
                        </div>
                    </form>

                    {error && <p className="text-center text-red-600 mt-3">{error}</p>}
                </div>
            </div>
        </>
    );
}

export default Register;
