import { Link } from "react-router-dom";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllClasses = () => {

    const axiosPublic = useAxiosPublic()

    const { data: classes = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/all-classes/accepted')
            return res.data
        }
    })

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className="min-h-[calc(100vh-184px)] max-w-7xl mx-auto pb-10 pt-24">
            <div className="grid md:grid-cols-2 gap-10">
                {
                    classes?.map(classCard => <div key={classCard._id}>
                        <div className="card card-side bg-base-100 shadow-xl flex flex-col">
                            <img src={classCard?.photo} alt="" className="w-full h-40 object-cover" />
                            <div className="card-body">
                                <h2 className="text-xl font-bold">{classCard?.title}</h2>
                                <p className="font-bold">Category: {classCard?.category}</p>
                                <p>{classCard?.description}</p>
                                <p className="font-medium">Price: ${classCard?.price}</p>
                                <p className="font-medium">Total Enrollment: {classCard?.enrolment}</p>
                                <div className="flex justify-start items-center gap-2">
                                    <div className="w-16 h-16 rounded-full">
                                        <img src={classCard?.teacher_photo} alt="" className="h-full w-full rounded-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Name: {classCard?.teacher_name}</p>
                                        <p className="font-medium">Email: {classCard?.teacher_email}</p>
                                    </div>
                                </div>
                                <div className="card-actions justify-start mt-3">
                                    <Link to={`/class-details/${classCard?._id}`}>
                                        <button className="btn btn-secondary text-white font-bold">Enroll</button>
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

export default AllClasses;