import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import MyClassCard from "./MyClassCard";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";


const MyClass = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data: classes, isLoading, refetch } = useQuery({
        queryKey: ['classes', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-classes/${user?.email}`)
            return data
        }
    })

    if(!classes.length){
        return <h3 className="text-3xl font-bold text-center mt-20">You have no added class</h3>
    }

    const handleDeleteItem = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3B82F6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/my-classes/${id}`)
                console.log(res.data)
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `Class has been deleted`,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    } 

    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div>
            <h3 className="text-3xl font-medium text-center mb-8">My Classes</h3>
            <div className="p-5 space-y-5">
                {
                    classes?.map(course => <MyClassCard
                        key={course?._id}
                        course={course}
                        handleDeleteItem={handleDeleteItem}
                    ></MyClassCard>)
                }
            </div>
        </div>
    );
};

export default MyClass;