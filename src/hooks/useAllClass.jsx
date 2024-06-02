import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllClass = () => {
    const axiosPublic = useAxiosPublic()

    const { refetch, isLoading, data: classes = [] } = useQuery({
        queryKey: [ 'classes' ],
        queryFn: async () => {
            const res = await axiosPublic.get('/all-classes')
            return res.data;
        }
    })
    return [classes, refetch, isLoading];
};

export default useAllClass;