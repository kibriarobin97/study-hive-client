import PropTypes from 'prop-types';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';

const ShowAssignment = ({ classes }) => {

    const axiosSecure = useAxiosSecure()

    const { data: subAssignment = [], isLoading } = useQuery({
        queryKey: ['subAssignment', classes?._id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/sub-assignment/${classes?._id}`)
            return data
        },
    })

    console.log(subAssignment)

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className='my-10'>
            <h3 className='text-2xl font-bold text-center my-5'>Submitted Assignment {subAssignment?.length}</h3>
            <div className='grid md:grid-cols-2 gap-5'>
                {
                    subAssignment?.map(data => <div key={data?._id} className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title"><span className='font-semibold'>Course Name:</span> {data?.title}</h2>
                        <p><span className='font-semibold'>Assignment Details:</span> {data?.description}</p>
                        <p className='font-semibold'>Status: {data?.status}</p>
                    </div>
                </div>)
                }
            </div>
        </div>
    );
};

ShowAssignment.propTypes = {
    classes: PropTypes.object
}

export default ShowAssignment;