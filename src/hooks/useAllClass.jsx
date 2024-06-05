import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllClass = () => {
    const axiosSecure = useAxiosSecure()

    const { isLoading, refetch, data: classesAll = [] } = useQuery({
        queryKey: [ 'classes' ],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-classes')
            return res.data;
        }
    })
    return [classesAll, isLoading, refetch];
};

export default useAllClass;