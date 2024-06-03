import toast from "react-hot-toast";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import useAllClass from "../../../hooks/useAllClass";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllClassesAdmin = () => {

    const [classes, isLoading, refetch] = useAllClass()

    const axiosSecure = useAxiosSecure()

    const handleAccept = id => {
        axiosSecure.patch(`/classes-accept/${id}`)
            .then(res => {
                console.log(res.data)
                if (res.data?.modifiedCount > 0) {
                    refetch()
                    toast.success(`class is accepted`)
                }
            })
    }

    const handleReject = id => {
        axiosSecure.patch(`/classes-reject/${id}`)
            .then(res => {
                if (res.data?.modifiedCount > 0) {
                    refetch()
                    toast.success(`class is rejected`)
                }
            })
    }

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className="mx-10">
            {/* <Helmet>
                <title>All-User | Taste-Trove</title>
            </Helmet> */}
            <div className="text-center flex justify-evenly items-center">
                <h2 className="lg:text-2xl text-xl font-semibold">Total Class: {classes.length}</h2>
            </div>
            <div>
                <div className="overflow-x-auto mt-8">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="bg-secondary">
                                <th><p className="text-white">#</p></th>
                                <th><p className="uppercase text-white">Image</p></th>
                                <th><p className="uppercase text-white">Title</p></th>
                                <th><p className="uppercase text-white">Category</p></th>
                                <th><p className="uppercase text-white">Teacher Email</p></th>
                                <th><p className="uppercase text-white">status</p></th>
                                <th><p className="uppercase text-white">Action</p></th>
                                <th><p className="uppercase text-white">Action</p></th>
                                <th><p className="uppercase text-white">Action</p></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                classes.map((classTable, idx) => <tr key={classTable._id}>
                                    <th>
                                        {idx + 1}
                                    </th>
                                    <td>
                                        <div className="w-10 h-10 rounded-full">
                                            <img src={classTable?.photo} alt="" className="rounded-full w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td>
                                        {classTable?.title}
                                    </td>
                                    <td>
                                        {classTable?.category}
                                    </td>
                                    <td>
                                        {classTable?.teacher_email}
                                    </td>
                                    <td>
                                        {classTable?.status}
                                    </td>
                                    <td>
                                        <button
                                            disabled={classTable?.status !== 'Accepted'}
                                            className="btn btn-secondary btn-sm">See progress</button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleAccept(classTable?._id)}
                                            disabled={classTable?.status !== 'Pending'}
                                            className="btn btn-success btn-sm text-white">
                                            Accept
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleReject(classTable?._id)}
                                            disabled={classTable?.status !== 'Pending'}
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

export default AllClassesAdmin;