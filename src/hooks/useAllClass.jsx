import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllClass = () => {
    const axiosSecure = useAxiosSecure()

    const { isLoading, refetch, data: classes = [] } = useQuery({
        queryKey: [ 'classes' ],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-classes')
            return res.data;
        }
    })
    return [classes, isLoading, refetch];
};

export default useAllClass;