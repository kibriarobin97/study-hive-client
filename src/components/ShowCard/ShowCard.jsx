import { useQuery } from "@tanstack/react-query";
import optimize from "../../assets/teaching/optimize.jpg"
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const ShowCard = () => {

    const axiosPublic = useAxiosPublic()

    const { data: stats = [], isLoading } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await axiosPublic.get('/public-stat')
            return res.data
        }
    })

    console.log(stats)

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className="max-w-7xl mx-auto my-20">
            <div>
                <h3 className="text-3xl font-bold text-center">Highlights</h3>
            </div>
            <div className="md:flex justify-center items-center gap-10 mt-10 p-5">
                <div className="w-4/5 mx-auto md:w-1/2 space-y-5">
                    <div className="p-5 text-center rounded-full shadow-lg bg-primary bg-opacity-50">
                        <div className="font-bold text-white text-xl">Total Users</div>
                        <div className="font-bold text-2xl text-white">{stats?.totalUsers}</div>
                    </div>

                    <div className="p-5 text-center rounded-full shadow-lg bg-secondary bg-opacity-50">
                        <div className="font-bold text-white text-xl">Total Classes</div>
                        <div className="font-bold text-2xl text-white">{stats?.totalClasses}</div>
                    </div>

                    <div className="p-5 text-center rounded-full shadow-lg bg-primary bg-opacity-50">
                        <div className="font-bold text-white text-xl">Total Enrollment</div>
                        <div className="font-bold text-2xl text-white">{stats?.totalEnroll}</div>
                    </div>
                </div>
                <div className="w-4/5 md:w-1/2 mx-auto mt-5 md:mt-0">
                    <img src={optimize} alt="" className="w-full object-cover md:h-[350px]"/>
                </div>
            </div>

        </div>
    );
};

export default ShowCard;