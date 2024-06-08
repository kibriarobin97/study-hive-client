import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import FeedbackModal from "../../../components/Modal/FeedbackModal";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import AssignmentCard from "./AssignmentCard";


const Assignment = () => {

    const [isOpen, setIsOpen] = useState(false)
    const axiosSecure = useAxiosSecure()
    const { id } = useParams()

    const closeModal = () => {
        setIsOpen(false)
    }

    
    const { data: classes = {}, isLoading } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/enroll-class/${id}`)
            return data
        }
    })

    if (isLoading) {
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
            <div>
                <AssignmentCard classes={classes}></AssignmentCard>
            </div>
        </div>
    );
};

export default Assignment;