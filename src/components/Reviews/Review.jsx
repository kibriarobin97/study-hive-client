import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import icon from "../../assets/teaching/Vector.png"
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import ReactStars from "react-rating-stars-component";

const Review = () => {

    const axiosPublic = useAxiosPublic()

    const {data: reviews =[]} = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
        const res = await axiosPublic.get('/reviews')
        return res.data
        }
    })

    return (
        <section className=''>
            <div>
                <h3 className='text-3xl font-bold text-center'>Reviews</h3>
            </div>
            <Swiper
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper mx-24 my-14"
            >
                {
                    reviews.map(review => <SwiperSlide key={review._id}>
                        <div className="flex flex-col justify-center items-center text-center md:px-32 space-y-3">
                            <div className="flex justify-center items-center gap-3">
                                <img src={icon} alt="" className="h-8" />
                                <img src={icon} alt="" className="h-8" />
                            </div>
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
                                <img src={review?.userPhoto} alt="" className='w-full h-full object-cover rounded-full'/>
                            </div>
                            <h3 className="text-2xl font-medium text-[#CD9003]">{review?.userName}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Review;