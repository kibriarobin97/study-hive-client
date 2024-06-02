import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const ClassDetails = () => {

    const { id } = useParams()
    const axiosPublic = useAxiosPublic()

    const { data: classes = {}, isLoading } = useQuery({
        queryKey: ['classes', id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/classes/${id}`)
            return data
        },
    })

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    console.log(classes)

    return (
        <div className="min-h-[calc(100vh-184px)] max-w-7xl mx-auto pb-10 pt-24">
            <div className="flex flex-col w-full p-6 space-y-6 overflow-hidden rounded-lg shadow-md">
                <div className="flex space-x-4">
                    <img alt="" src={classes?.teacher_photo} className="object-cover w-12 h-12 rounded-full shadow bg-gray-500" />
                    <div className="flex flex-col space-y-1">
                        <span className="text-sm font-semibold">Name: {classes?.teacher_name}</span>
                        <span className="text-sm font-semibold">Email: {classes?.teacher_email}</span>
                    </div>
                </div>
                <div>
                    <img src={classes?.photo} alt="" className="object-cover w-full mb-4 h-60 sm:h-96 bg-gray-500" />
                    <h2 className="mb-1 text-xl font-bold">{classes?.title}</h2>
                    <p className="font-semibold">Price: ${classes?.price}</p>
                    <p><span className="font-semibold">Description:</span> {classes?.description}</p>
                    <p className="font-semibold">Category: {classes?.category}</p>
                    <p className="font-semibold">Total Enrolment: {classes?.enrolment}</p>
                </div>
                <div>
                    <button className="btn btn-secondary font-bold">
                        Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClassDetails;