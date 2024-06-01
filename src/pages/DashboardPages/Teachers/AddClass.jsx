import useAuth from "../../../hooks/useAuth";

const AddClass = () => {

    const { user } = useAuth()

    const handleAddClass = e => {
        e.preventDefault()

        const form = e.target;

        const title = form.title.value;
        const category = form.category.value;
        const price = form.price.value;
        const photo = form.photo.value;
        const description = form.description.value;
        const teacher_name= user?.displayName;
        const teacher_email = user?.email;
        const teacher_photo = user?.photoURL;

        const claasInfo = {title, category, price, photo, description, teacher_name, teacher_email, teacher_photo}

        console.log(claasInfo)
    }

    return (
        <section className="p-6 text-black">
            <h3 className="text-3xl font-medium text-center mb-5">Add Class</h3>
            <form
            onSubmit={handleAddClass}
            className="flex flex-col space-y-12">
                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-base-200 mx-auto w-full">
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="firstname" className="text-sm font-medium">Title</label>
                            <input name="title" type="text" placeholder="Title" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 p-2" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="lastname" className="text-sm font-medium">Category</label>
                            <select name="category" id="" className="w-full rounded-md focus:ring focus:ring-opacity-75 p-2 text-gray-900 focus:ring-violet-400 border-gray-700">
                                <option value="web devlopment">Web Development</option>
                                <option value="digital marketing">Digital Marketing</option>
                                <option value="graphic design">Graphic Design</option>
                                <option value="ux/ui design">UI/UX Design</option>
                                <option value="video editing">Video Editing</option>
                            </select>
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="firstname" className="text-sm font-medium">Price</label>
                            <input name="price" type="number" placeholder="Price" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 p-2" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="firstname" className="text-sm font-medium">PhotoURL</label>
                            <input name="photo" type="text" placeholder="Photo URL" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 p-2" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="firstname" className="text-sm font-medium">User Email</label>
                            <input name="email" disabled defaultValue={user?.email} type="email" placeholder="User email" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 p-2" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="firstname" className="text-sm font-medium">User Name</label>
                            <input name="name" disabled defaultValue={user?.displayName} type="text" placeholder="User name" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 p-2" />
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="bio" className="text-sm font-medium">Description</label>
                            <textarea name="description" placeholder="Description" className="w-full rounded-md focus:ring focus:ring-opacity-75 p-2 text-gray-900 focus:ring-violet-400 border-gray-700"></textarea>
                        </div>
                        <div>
                            <input type="submit" value="Add Class" className="bg-secondary text-white btn font-bold hover:bg-primary duration-300"/>
                        </div>
                    </div>
                </fieldset>
            </form>
        </section>
    );
};

export default AddClass;