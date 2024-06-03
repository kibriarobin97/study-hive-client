import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";

const UpdateClasses = () => {

    const { id } = useParams()
    const axiosSecure = useAxiosSecure()

    const { data: classes = {}, isLoading } = useQuery({
        queryKey: ['classes', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/classes-update/${id}`)
            return data
        },
    })
    
    console.log(classes)

    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div>
            update classes {classes?.title}
        </div>
    );
};

export default UpdateClasses;