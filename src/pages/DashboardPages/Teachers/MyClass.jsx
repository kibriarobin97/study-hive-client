import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import MyClassCard from "./MyClassCard";


const MyClass = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data: classes } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/classes/${user?.email}`)
            return data
        }
    })
    console.log(classes)

    return (
        <div>
            <h3 className="text-3xl font-medium text-center mb-8">My Classes</h3>
            <div className="p-5 space-y-5">
                {
                    classes?.map(course => <MyClassCard
                        key={course?._id}
                        course={course}
                    ></MyClassCard>)
                }
            </div>
        </div>
    );
};

export default MyClass;