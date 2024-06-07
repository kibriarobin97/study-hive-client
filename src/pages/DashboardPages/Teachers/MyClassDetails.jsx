import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import { IoCreateOutline } from "react-icons/io5";
import { useState } from "react";
import AssignmentModal from "../../../components/Modal/AssignmentModal";

const MyClassDetails = () => {

    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const [isOpen, setIsOpen] = useState(false)

    const { data: classes = {}, isLoading } = useQuery({
        queryKey: ['classes', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/teacher-stat/${id}`)
            return data
        },
    })

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <div>
            <div className="px-20 py-10">
                <div className="stats stats-vertical w-full lg:stats-horizontal shadow-xl">

                    <div className="stat text-center">
                        <div className="stat-title font-bold">Total Enrollment</div>
                        <div className="stat-value">{classes?.enrolment}</div>
                    </div>

                    <div className="stat text-center border-primary">
                        <div className="stat-title font-bold">Total Assignment</div>
                        <div className="stat-value">{classes?.assignment}</div>
                    </div>

                    <div className="stat text-center border-primary">
                        <div className="stat-title font-bold">Per day Assignment </div>
                        <div className="stat-value">1,200</div>
                    </div>
                </div>
                <div className="my-5">
                    <button 
                    onClick={() => setIsOpen(true)}
                    className="btn btn-error text-white font-bold">Create Assignment <IoCreateOutline className="text-xl"/></button>
                </div>
                <AssignmentModal
                isOpen={isOpen}
                classes={classes}
                closeModal={closeModal}
            ></AssignmentModal>
            </div>
        </div>
    );
};

export default MyClassDetails;