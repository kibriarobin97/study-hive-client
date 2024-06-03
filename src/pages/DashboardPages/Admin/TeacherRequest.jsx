import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const TeacherRequest = () => {

    const axiosSecure = useAxiosSecure()

    const { data: teachers = [], refetch} = useQuery({
        queryKey: ['teachers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/apply-teach')
            return res.data
        }
    })

    const handleAccept = user => {
        axiosSecure.patch(`/apply-teach/${user?._id}/${user?.email}`)
            .then(res => {
                console.log(res.data)
                if (res.data?.result?.modifiedCount > 0) {
                    refetch()
                    toast.success(`${user?.name} is teacher now!`)
                }
            })
    }

    const handleReject = user => {
        axiosSecure.patch(`/reject-teach/${user?._id}/${user?.email}`)
            .then(res => {
                if (res.data?.result?.modifiedCount > 0) {
                    refetch()
                    toast.success(`${user?.name} teacher request is rejected`)
                }
            })
    }

    return (
        <div className="mx-10">
            {/* <Helmet>
                <title>All-User | Taste-Trove</title>
            </Helmet> */}
            <div className="text-center flex justify-evenly items-center">
                <h2 className="lg:text-2xl text-xl font-semibold">Total Teacher Request: {teachers.length}</h2>
            </div>
            <div>
                <div className="overflow-x-auto mt-8">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="bg-secondary">
                                <th><p className="text-white">#</p></th>
                                <th><p className="uppercase text-white">Image</p></th>
                                <th><p className="uppercase text-white">Name</p></th>
                                <th><p className="uppercase text-white">Category</p></th>
                                <th><p className="uppercase text-white">Experience</p></th>
                                <th><p className="uppercase text-white">Status</p></th>
                                <th><p className="uppercase text-white">Action</p></th>
                                <th><p className="uppercase text-white">Action</p></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                teachers.map((user, idx) => <tr key={user._id}>
                                    <th>
                                        {idx + 1}
                                    </th>
                                    <td>
                                        <div className="w-12 h-12 rounded-full">
                                            <img src={user?.photo} alt="" className="rounded-full w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td>
                                        {user?.name}
                                    </td>
                                    <td>
                                        {user?.category}
                                    </td>
                                    <td>
                                        {user?.experience}
                                    </td>
                                    <td>
                                        {user?.status}
                                    </td>
                                    <td>
                                        <button
                                        onClick={() => handleAccept(user)}
                                        disabled={user?.status !== 'Pending'}
                                        className="btn btn-success btn-sm text-white">
                                            Accept
                                        </button>
                                    </td>
                                    <td>
                                        <button 
                                        onClick={() => handleReject(user)}
                                        disabled={user?.status !== 'Pending'}
                                        className="btn btn-error btn-sm text-white">
                                            Reject
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeacherRequest;