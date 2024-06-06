import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const TeachOn = () => {

    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [role, isLoading] = useRole()

    const { data: users = []} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    const status = users?.map(user => user?.status)
    console.log(status)

    const { mutateAsync } = useMutation({
        mutationFn: async teacherData => {
            const { data } = await axiosSecure.put('/apply-teach', teacherData)
            return data
        },
        onSuccess: () => {
            toast.success('Applied successfully, wait for admin approval!')
            // navigate('/dashboard/my-class')s
        }
    })

    const { register, handleSubmit, formState: { errors }, } = useForm()

    const onSubmit = async (data) => {
        try {
            await mutateAsync({ ...data, status: 'Pending', role: 'Student', photo: user?.photoURL })
        }
        catch (err) {
            console.log(err)
        }
    }

    if(loading || isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }

    if (role === 'Teacher') {
        return (
            <div className="min-h-[calc(100vh-184px)] pb-5 pt-20 max-w-7xl mx-auto lg:flex justify-center items-center gap-10">
                <h3 className="text-3xl font-bold text-center">
                    You are a teacher at StudyHive</h3>
            </div>
        )
    }

    return (
        <div>
            <div className="min-h-[calc(100vh-184px)] pb-5 pt-20 max-w-7xl mx-auto lg:flex justify-center items-center gap-10">
                <div className="lg:w-1/2 w-full max-w-xl px-8 space-y-3 rounded-xl text-black">
                    <h1 className="text-2xl font-bold text-center">Request for Teaching</h1>
                    <div className="flex justify-center items-center py-5">
                        <img src={user?.photoURL} alt="" className="rounded-full w-28 h-28" />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
                        <div className="grid md:grid-cols-2 gap-5">
                            <div className="space-y-1 text-sm">
                                <label htmlFor="username" className="block text-gray-500 font-medium">Name</label>
                                <input type="text" defaultValue={user?.displayName}  {...register("name", { required: true })} id="username" placeholder="Your Name" className="w-full px-4 py-3 bg-gray-200 rounded-md border-gray-700  text-gray-600 focus:border-violet-400" />
                                {errors.name && <span className="text-red-500">Name is required</span>}
                            </div>
                            <div className="space-y-1 text-sm">
                                <label htmlFor="username" className="block text-gray-500 font-medium">Email</label>
                                <input type="email" readOnly defaultValue={user?.email} {...register("email", { required: true })} id="" placeholder="Your Email" className="w-full px-4 py-3 bg-gray-200 rounded-md border-gray-700  text-gray-600 focus:border-violet-400" />
                                {errors.email && <span className="text-red-500">Email is required</span>}
                            </div>
                            <div className="space-y-1 text-sm">
                                <label className="block text-gray-500 font-medium">Experience</label>
                                <select {...register("experience", { required: true })} className="w-full rounded-md bg-gray-200 focus:ring focus:ring-opacity-75 p-2 text-gray-900 focus:ring-violet-400 border-gray-700">
                                    <option value="Beginner">Beginner</option>
                                    <option value="Mid-Level">Mid-Level</option>
                                    <option value="Experienced">Experienced</option>
                                </select>
                            </div>
                            <div className="space-y-1 text-sm">
                                <label className="block text-gray-500 font-medium">Category</label>
                                <select {...register("category", { required: true })} className="w-full rounded-md focus:ring focus:ring-opacity-75 p-2 text-gray-900 focus:ring-violet-400 bg-gray-200 border-gray-700">
                                    <option value="Web Development">Web Development</option>
                                    <option value="Digital Marketing">Digital Marketing</option>
                                    <option value="Graphic Design">Graphic Design</option>
                                    <option value="UX/UI Design">UI/UX Design</option>
                                    <option value="Video Editing">Video Editing</option>
                                </select>
                            </div>
                            <div className="space-y-1 text-sm">
                                <label htmlFor="username" className="block text-gray-500 font-medium">Title</label>
                                <input type="text" {...register("title", { required: true })} id="username" placeholder="Title" className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-200 text-gray-600 focus:border-violet-400" />
                                {errors.title && <span className="text-red-500">Title is required</span>}
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            {
                                status[3] === 'Rejected' ? <input className="btn btn-secondary cursor-pointer text-center font-bold rounded-md text-white" type="submit" value="Request to Another" /> :
                                <input className="btn btn-secondary cursor-pointer text-center font-bold rounded-md text-white" type="submit" value="Submit for Review" />
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TeachOn;