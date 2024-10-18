import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from '../../Context/ToastContext';
import { toast } from "react-toastify";

function Login() {
    // state variables for email and passwords
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberme, setRememberme] = useState<boolean>(false);
    // state variable for error messages
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
    // Destructuring the triggerToast function from the useToast context
    const { triggerToast } = useToast();

    // handle change events for input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "rememberme") setRememberme(e.target.checked);
    };

    const handleRegisterClick = () => {
        navigate("/register");
    }

    // handle submit event for the form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // validate email and passwords
        if (!email || !password) {
            setError("Please fill in all fields.");
        } else {
            // clear error message
            setError("");
            // post data to the /login api
            const loginurl = rememberme ? "/login?useCookies=true" : "/login?useSessionCookies=true";

            fetch(loginurl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then((data) => {
                    // handle success or error from the server
                    if (data.ok) {
                        triggerToast("Login Successful");
                        navigate("/");
                    } else {
                        toast.error("Email or password failed");
                    }
                })
                .catch((error) => {
                    // handle network error
                    console.error(error);
                    setError("Error Logging in.");
                });
        }
    };

    return (
        <>
            <div className="flex justify-center mt-2">
                <img className="md:w-1/5 w-1/2" src="/assets/images/LogoV2.png" alt="Logo" />
            </div>

            <div className="flex justify-center">
                <div className="w-full w-full max-w-sm lg:max-w-lg p-6 bg-white rounded-lg shadow-lg">
                    <h3 className="text-center text-xl font-bold">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-md font-bold mb-2" htmlFor="email">Email:</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-md font-bold mb-2" htmlFor="password">Password:</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex items-center mb-4">
                            <input
                                className="mr-2"
                                type="checkbox"
                                id="rememberme"
                                name="rememberme"
                                checked={rememberme}
                                onChange={handleChange}
                            />
                            <label htmlFor="rememberme" className="text-md">Remember Me</label>
                        </div>

                        <div className="flex justify-center space-x-2">
                            <button className="bg-primary text-white py-2 px-4 rounded" type="submit">Login</button>
                            <button className="border bg-secondary border-gray-600 text-gray-600 py-2 px-4 rounded" type="button" onClick={handleRegisterClick}>New Here? Register</button>
                        </div>
                    </form>
                    {error && <p className="text-center text-red-500 mt-3">{error}</p>}
                </div>
            </div>
        </>
    );
}

export default Login;
