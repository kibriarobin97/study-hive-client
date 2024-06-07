import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import FeedbackModal from "../../../components/Modal/FeedbackModal";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";


const Assignment = () => {

    const [isOpen, setIsOpen] = useState(false)
    const axiosSecure = useAxiosSecure()
    const { id } = useParams()

    const closeModal = () => {
        setIsOpen(false)
    }

    const { data: assignments = [], isLoading} = useQuery({
        queryKey: ['assignments'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/assignment/${classes?.classId}`)
            return data
        }
    })

    const { data: classes = {} } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/enroll-class/${id}`)
            return data
        }
    })

    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }


    return (
        <div className="mx-10">
            {/* <Helmet>
                <title>All-User | Taste-Trove</title>
            </Helmet> */}
            <div className="my-10">
                <button
                    onClick={() => setIsOpen(true)}
                    className="btn btn-success font-bold text-white">Teaching Evaluation Report <FaPlus /></button>
            </div>
            <FeedbackModal
                isOpen={isOpen}
                classes={classes}
                closeModal={closeModal}
            ></FeedbackModal>
            <div className="text-center flex justify-evenly items-center">
                <h2 className="lg:text-2xl text-xl font-semibold">Total Assignment: {assignments?.length}</h2>
            </div>
            <div>
                <div className="overflow-x-auto mt-8">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="bg-secondary">
                                <th><p className="text-white">#</p></th>
                                <th><p className="uppercase text-white">Title</p></th>
                                <th><p className="uppercase text-white">description</p></th>
                                <th><p className="uppercase text-white">Deadline</p></th>
                                <th><p className="uppercase text-white">Action</p></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                assignments?.map((assignment, idx) => <tr key={assignment._id}>
                                    <th>
                                        {idx + 1}
                                    </th>
                                    <td>
                                        {assignment?.assignmentTitle}
                                    </td>
                                    <td>
                                        {assignment?.description}
                                    </td>
                                    <td>
                                        {assignment?.deadline}
                                    </td>
                                    <td>
                                        <button
                                            disabled={assignment?.status !== 'Pending'}
                                            className="btn btn-success btn-sm text-white">
                                            Submit
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Assignment;