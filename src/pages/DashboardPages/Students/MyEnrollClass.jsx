import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";

const MyEnrollClass = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data: MyClasses, isLoading } = useQuery({
        queryKey: ['MyClasses', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-enroll-class/${user?.email}`)
            return data
        }
    })

    console.log(MyClasses)

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className="px-10">
            <h3 className="text-2xl font-bold text-center my-5">My Enroll Class</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    MyClasses?.map(classCard => <div key={classCard?._id}>
                        <div className="card bg-base-100 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img src={classCard?.photo} alt="" className="rounded-xl object-cover" />
                            </figure>
                            <div className="items-center text-center my-5 space-y-3">
                                <h2 className="font-bold text-xl">{classCard?.title}</h2>
                                <p className="font-semibold">Category: {classCard?.category}</p>
                                <p className="font-semibold">Teacher Name: {classCard?.teacher_name}</p>
                                <div className="">
                                    <Link to={`/dashboard/assignment/${classCard?._id}`}>
                                        <button className="btn btn-secondary font-bold">Continue</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyEnrollClass;