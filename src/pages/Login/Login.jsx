import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {

    const [showPass, setShowPass] = useState(false)

    return (
        <div>
            <div className="w-full max-w-md mx-auto min-h-[calc(100vh-264px)] p-8 space-y-3 rounded-xl text-black">
                {/* <Helmet>
                    <title>Login | Legal-Vantage</title>
                </Helmet> */}
                <h1 className="text-2xl font-bold text-center">Please Login</h1>
                <p className="text-sm text-center text-gray-500">Login to access your account</p>
                <form
                    // onSubmit={handleLogin}
                    className="space-y-6">
                    <div className="space-y-1 text-sm">
                        <label htmlFor="email" className="block text-black">Email</label>
                        <input type="email" name="email" id="email" required placeholder="Your Email" className="w-full px-4 py-3 rounded-md border-gray-700  text-black focus:border-violet-400" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block text-black">Password</label>
                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                name="password" id="password" required placeholder="Password" className="w-full px-4 py-3 rounded-md border-gray-700 text-black focus:border-violet-400" />
                            <span onClick={() => setShowPass(!showPass)} className="absolute top-3 right-2">
                                {
                                    showPass ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />
                                }
                            </span>
                        </div>
                        <div className="flex justify-end text-xs text-blue-500">
                            <a rel="noopener noreferrer" href="#">Forgot Password?</a>
                        </div>
                    </div>
                    <button className="block w-full p-3 text-center rounded-md font-bold bg-secondary text-white">Sign In</button>
                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
                    <p className="px-3 text-sm text-black">or</p>
                    <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
                </div>
                <div className="flex justify-center space-x-4">
                    <button
                        // onClick={handleGoogle}
                        aria-label="Log in with Google" className="p-3 rounded-sm">
                        <div className="flex justify-center items-center gap-2 border-2 p-2">
                            <FaGoogle />
                            <p className="font-semibold">Sign in with Google</p>
                        </div>
                    </button>
                </div>
                <p className="text-xs text-center sm:px-6 text-black">Do not have an account?
                    <Link to='/register' className="underline text-primary"> Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;