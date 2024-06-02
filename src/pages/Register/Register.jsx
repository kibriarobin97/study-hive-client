import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";



const Register = () => {

    const axiosPublic = useAxiosPublic()

    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    const { createUser, updateUserProfile, googleLogin } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/'

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photo: data.photo,
                            role: 'Student'
                        }
                        axiosPublic.put('/user', userInfo)
                            .then(res => {
                                console.log(res.data)
                                reset();
                                toast.success('Created account successfully')
                                navigate('/')

                            })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    // login with google
    const handleGoogle = () => {
        googleLogin()
            .then(result => {
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    photo: result.user?.photoURL,
                    role: 'Student'
                }
                axiosPublic.put('/user', userInfo)
                    .then(res => {
                        console.log(res.data)
                        toast.success('Successfully login with Google')
                        navigate(from, { replace: true })

                    })
            })
            .catch(error => {
                console.error(error)
                toast.error(error.message)
            })
    }

    return (
        <>
            {/* <Helmet>
                <title>Register | Taste Trove</title>
            </Helmet> */}
            <div className="min-h-[calc(100vh-184px)] p-8 pt-20 max-w-7xl mx-auto lg:flex justify-center items-center gap-10 md:min-h-screen">
                <div className="lg:w-1/2 w-full max-w-md px-8 space-y-3 rounded-xl text-black">
                    <h1 className="text-2xl font-bold text-center">Please Sign Up</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-1 text-sm">
                            <label htmlFor="username" className="block text-gray-500 font-medium">Name</label>
                            <input type="text" name="name" {...register("name", { required: true })} id="username" placeholder="Your Name" className="w-full px-4 py-3 rounded-md border-gray-700  text-gray-600 focus:border-violet-400" />
                            {errors.name && <span className="text-red-500">Name is required</span>}
                        </div>
                        <div className="space-y-1 text-sm">
                            <label htmlFor="username" className="block text-gray-500 font-medium">Photo</label>
                            <input type="text" name="photo" {...register("photo", { required: true })} id="username" placeholder="Photo URL" className="w-full px-4 py-3 rounded-md border-gray-700  text-gray-600 focus:border-violet-400" />
                            {errors.photo && <span className="text-red-500">Photo URL is required</span>}
                        </div>
                        <div className="space-y-1 text-sm">
                            <label htmlFor="username" className="block text-gray-500 font-medium">Email</label>
                            <input type="email" name="email" {...register("email", { required: true })} id="" placeholder="Your Email" className="w-full px-4 py-3 rounded-md border-gray-700  text-gray-600 focus:border-violet-400" />
                            {errors.email && <span className="text-red-500">Email is required</span>}
                        </div>
                        <div className="space-y-1 text-sm">
                            <label htmlFor="password" className="block text-gray-500 font-medium">Password</label>
                            <input type="password" name="password" {...register("password",
                                {
                                    required: true,
                                    maxLength: 10,
                                    minLength: 6,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border-gray-700 text-gray-600 focus:border-violet-400" />
                            {errors.password?.type === "required" && (<p className="text-red-500">Password is required</p>)}
                            {errors.password?.type === "minLength" && (<p className="text-red-500">Password must be 6 characters</p>)}
                            {errors.password?.type === "maxLength" && (<p className="text-red-500">Password must be less than 10 characters</p>)}
                            {errors.password?.type === "pattern" && (<p className="text-red-500">Password must have one uppercase, one lowercase, one number and one special character</p>)}
                        </div>
                        <input className="block w-full btn cursor-pointer p-3 text-center font-bold rounded-sm text-white bg-secondary" type="submit" value="Sign Up" />
                    </form>
                    <div className="flex items-center pt-4 space-x-1">
                        <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
                        <p className="px-3 text-sm text-gray-500 font-medium">Login with social accounts</p>
                        <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={handleGoogle}
                            aria-label="Log in with Google" className="p-3 rounded-sm">
                            <div className="flex justify-center items-center gap-2 border-2 p-2">
                                <FaGoogle />
                                <p className="font-semibold">Sign in with Google</p>
                            </div>
                        </button>
                    </div>
                    <p className="text-xs text-center sm:px-6 text-gray-500">Already have an account?
                        <Link to='/login' className="underline text-primary font-medium"> Sign In</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;