import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const UpdateClasses = () => {

    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const navigate = useNavigate()

    const { data: classes = {}, isLoading } = useQuery({
        queryKey: ['classes', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/classes-update/${id}`)
            return data
        },
    })

    const { mutateAsync } = useMutation({
        mutationFn: async classData => {
            const {data} = await axiosSecure.patch(`/update-classes/${classes?._id}`, classData)
            return data
        },
        onSuccess: () => {
            toast.success('class updated successfully')
            navigate('/dashboard/my-class')
        }
    })

    const handleUpdateClass = async e => {
        e.preventDefault()

        const form = e.target;

        const title = form.title.value;
        const category = form.category.value;
        const price = form.price.value;
        const photo = form.photo.value;
        const description = form.description.value;
        const teacher_name = user?.displayName;
        const teacher_email = user?.email;
        const teacher_photo = user?.photoURL;
        const enrolment = "0";

        try {
            const classInfo = { title, category, price, photo, description, teacher_name, teacher_email, teacher_photo, enrolment }

            await mutateAsync(classInfo)
        }
        catch (err) {
            console.log(err)
        }
    }
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <section className="p-6 text-black">
            <h3 className="text-3xl font-medium text-center mb-5">Add Class</h3>
            <form
                onSubmit={handleUpdateClass}
                className="flex flex-col space-y-12">
                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-base-200 mx-auto w-full">
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm font-medium">Title</label>
                            <input name="title" defaultValue={classes?.title} type="text" placeholder="Title" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 p-2" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm font-medium">Category</label>
                            <select name="category" id="" className="w-full rounded-md focus:ring focus:ring-opacity-75 p-2 text-gray-900 focus:ring-violet-400 border-gray-700">
                                <option value="Web Development">Web Development</option>
                                <option value="Digital Marketing">Digital Marketing</option>
                                <option value="Graphic Design">Graphic Design</option>
                                <option value="UX/UI Design">UI/UX Design</option>
                                <option value="Video Editing">Video Editing</option>
                            </select>
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm font-medium">Price</label>
                            <input name="price" defaultValue={classes?.price} type="number" placeholder="Price" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 p-2" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm font-medium">PhotoURL</label>
                            <input name="photo" defaultValue={classes?.photo} type="text" placeholder="Photo URL" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 p-2" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm font-medium">User Email</label>
                            <input name="email" disabled defaultValue={user?.email} type="email" placeholder="User email" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 p-2" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm font-medium">User Name</label>
                            <input name="name" disabled defaultValue={user?.displayName} type="text" placeholder="User name" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 p-2" />
                        </div>
                        <div className="col-span-full">
                            <label className="text-sm font-medium">Description</label>
                            <textarea name="description" defaultValue={classes?.description} placeholder="Description" className="w-full rounded-md focus:ring focus:ring-opacity-75 p-2 text-gray-900 focus:ring-violet-400 border-gray-700"></textarea>
                        </div>
                        <div>
                            <input type="submit" value="Update Class" className="bg-secondary text-white btn font-bold hover:bg-primary duration-300" />
                        </div>
                    </div>
                </fieldset>
            </form>
        </section>
    );
};

export default UpdateClasses;