import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAllClass = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { refetch, data: classes = [] } = useQuery({
        queryKey: ['classes', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes?email=${user?.email}`)
            return res.data;
        }
    })
    return [classes, refetch];
};

export default useAllClass;