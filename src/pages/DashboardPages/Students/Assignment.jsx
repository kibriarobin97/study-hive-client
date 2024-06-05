import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import FeedbackModal from "../../../components/Modal/FeedbackModal";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const Assignment = () => {

    const [isOpen, setIsOpen] = useState(false)
    const axiosSecure = useAxiosSecure()
    const { id } = useParams()

    const closeModal = () => {
        setIsOpen(false)
    }

    

    const { data: classes = {} } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/enroll-class/${id}`)
            return data
        }
    })
    console.log(classes)

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
                <h2 className="lg:text-2xl text-xl font-semibold">Total Assignment:</h2>
            </div>
            <div>
                <div className="overflow-x-auto mt-8">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="bg-secondary">
                                <th><p className="text-white">#</p></th>
                                <th><p className="uppercase text-white">Title</p></th>
                                <th><p className="uppercase text-white">Category</p></th>
                                <th><p className="uppercase text-white">Deadline</p></th>
                                <th><p className="uppercase text-white">Action</p></th>
                            </tr>
                        </thead>
                        {/* <tbody>
                            {
                                teachers.map((user, idx) => <tr key={user._id}>
                                    <th>
                                        {idx + 1}
                                    </th>
                                    <td>
                                        <div className="w-12 h-12 rounded-full">
                                            <img src={user?.photo} alt="" className="rounded-full w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td>
                                        {user?.name}
                                    </td>
                                    <td>
                                        {user?.category}
                                    </td>
                                    <td>
                                        {user?.experience}
                                    </td>
                                    <td>
                                        {user?.status}
                                    </td>
                                    <td>
                                        <button
                                            // onClick={() => handleAccept(user)}
                                            disabled={user?.status !== 'Pending'}
                                            className="btn btn-success btn-sm text-white">
                                            Accept
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody> */}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Assignment;