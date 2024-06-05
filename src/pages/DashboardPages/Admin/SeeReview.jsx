import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ReactStars from "react-rating-stars-component";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";

const SeeReview = () => {

    const { id } = useParams()
    const axiosSecure = useAxiosSecure()

    const { data: reviews = {}, isLoading } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/review/${id}`)
            return data
        }
    })


    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }

    if(!reviews?.length){
        return <h3 className="text-3xl font-bold text-center mt-20">No Feedback for this class</h3>
    }

    return (
        <div className="my-5">
            <h3 className="text-3xl font-bold text-center">Feedback</h3>
            <div className="my-8 space-y-5">
                {
                    reviews?.map(review => <div key={review?._id}>
                        <div className="flex flex-col justify-center items-center text-center md:px-32 space-y-3 border-2 border-orange-400 p-2">
                            <p className='font-semibold text-xl'>{review?.title}</p>
                            <p>{review?.description}</p>
                            <ReactStars
                                count={5}
                                size={24}
                                value={review?.ratings}
                                activeColor="#ffd700"
                                edit={false}
                            />
                            <div className='w-20 h-20 rounded-full'>
                                <img src={review?.userPhoto} alt="" className='w-full h-full object-cover rounded-full' />
                            </div>
                            <h3 className="text-2xl font-medium text-[#CD9003]">{review?.userName}</h3>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default SeeReview;