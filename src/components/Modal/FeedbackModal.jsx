import PropTypes from 'prop-types'
import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';
import { Fragment, useState } from 'react';
import ReactStars from "react-rating-stars-component";
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const FeedbackModal = ({ closeModal, isOpen, classes }) => {

    const [rating, setRating] = useState(0);
    const axiosSecure = useAxiosSecure()

    const ratingChanged = (newRating) => {
        setRating(newRating)
    };

    const { mutateAsync } = useMutation({
        mutationFn: async reviewData => {
            const {data} = await axiosSecure.post('/review', reviewData)
            return data
        },
        onSuccess: () => {
            toast.success('Feedback successful')
        }
    })

    const handleSubmit = async e =>{
        e.preventDefault()

        const form = e.target;
        const description = form.description.value;
        const ratings = rating;
        const title = classes?.title;
        const classId = classes?.classId;
        const enrollId = classes?._id;
        const userName = classes?.name;
        const userPhoto = classes?.userPhoto;
        try{
            const reviewInfo = {
                description, ratings, title, classId, enrollId, userName, userPhoto
            }

            await mutateAsync(reviewInfo)
            closeModal()
        }
        catch(err){
            console.log(err)
        }
        
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
                <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </TransitionChild>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <TransitionChild
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <DialogTitle
                                    as='h3'
                                    className='text-lg font-medium text-center leading-6 text-gray-900'
                                >
                                    Give Feedback {classes?.title}
                                </DialogTitle>
                                <div className='mt-2'>
                                    <form onSubmit={handleSubmit}>
                                        <div className="col-span-full">
                                            <label className="text-sm font-medium">Description</label>
                                            <textarea name="description" placeholder="Description" className="w-full rounded-md focus:ring focus:ring-opacity-75 p-2 text-gray-900 focus:ring-violet-400 border-gray-700"></textarea>
                                        </div>
                                        <div>
                                            <ReactStars
                                                count={5}
                                                onChange={ratingChanged}
                                                size={24}
                                                activeColor="#ffd700"
                                                value={rating}
                                            />
                                        </div>
                                        <div>
                                            <input type="submit" value="Submit" className="bg-secondary text-white btn font-bold hover:bg-primary duration-300" />
                                        </div>
                                    </form>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

FeedbackModal.propTypes = {
    closeModal: PropTypes.func,
    isOpen: PropTypes.bool,
    classes: PropTypes.object,
}

export default FeedbackModal;