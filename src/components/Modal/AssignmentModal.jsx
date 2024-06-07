import PropTypes from 'prop-types'
import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';
import { Fragment } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const AssignmentModal = ({ isOpen, closeModal, classes }) => {

    const axiosSecure = useAxiosSecure()

    const { mutateAsync } = useMutation({
        mutationFn: async assignmentData => {
            const {data} = await axiosSecure.put(`/add-assignment/${classes?._id}`, assignmentData)
            return data
        },
        onSuccess: () => {
            toast.success('Create assignment successfully')
        }
    })

    const handleSubmit = async e =>{
        e.preventDefault()

        const form = e.target;
        const assignmentTitle = form.title.value;
        const description = form.description.value;
        const deadline = form.date.value;
        const title = classes?.title;
        const category = classes?.category
        const classId = classes?._id;
        const status = 'Pending'
        try{
            const assignmentInfo = {
                description, title, classId, deadline, assignmentTitle, category, status
            }

            await mutateAsync(assignmentInfo)
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
                                    Create assignment {classes?.title}
                                </DialogTitle>
                                <div className='mt-2'>
                                    <form
                                    onSubmit={handleSubmit}
                                    >
                                        <div className="col-span-full sm:col-span-3">
                                            <label className="text-sm font-medium">Title</label>
                                            <input name="title" type="text" placeholder="Title" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 p-2" />
                                        </div>
                                        <div className="col-span-full sm:col-span-3">
                                            <label className="text-sm font-medium">Date</label>
                                            <input name="date" type="date" placeholder="date" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 p-2" />
                                        </div>
                                        <div className="col-span-full">
                                            <label className="text-sm font-medium">Description</label>
                                            <textarea name="description" placeholder="Description" className="w-full rounded-md focus:ring focus:ring-opacity-75 p-2 text-gray-900 focus:ring-violet-400 border-gray-700"></textarea>
                                        </div>
                                        <div>
                                            <input type="submit" value="Add Assignment" className="bg-secondary text-white btn font-bold hover:bg-primary duration-300" />
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

AssignmentModal.propTypes = {
    closeModal: PropTypes.func,
    isOpen: PropTypes.bool,
    classes: PropTypes.object,
}

export default AssignmentModal;