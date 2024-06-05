import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const PopularClass = () => {


    const axiosPublic = useAxiosPublic()

    const { data: popular = [] } = useQuery({
        queryKey: ['popular'],
        queryFn: async () => {
            const res = await axiosPublic.get('/enroll-class')
            return res.data
        }
    })

    console.log(popular)

    return (
        <div className="my-20">
            <div>
                <h3 className='text-3xl font-bold text-center'>Popular Courses</h3>
            </div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                // navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    popular?.map(course => <SwiperSlide key={course?._id} className="my-10">
                        <div className="space-y-2">
                            <img src={course?.photo} alt=""className="w-full md:w-1/2 h-60 mx-auto object-cover"/>
                            <h3 className="text-2xl font-bold text-center">{course?.title}</h3>
                            <p className="font-semibold text-lg text-center">Category: {course?.category}</p>
                            <p className="font-medium text-center">Price: ${course?.price}</p>
                        </div>
                        <div className="text-center space-y-2 mt-5">
                            <p className="font-medium">Teacher Name: {course?.teacher_name}</p>
                            <p className="font-medium">Teacher Name: {course?.teacher_email}</p>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default PopularClass;