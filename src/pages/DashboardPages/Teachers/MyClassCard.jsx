import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MyClassCard = ({ course, handleDeleteItem }) => {
    const { _id, title, photo, description, category, price, teacher_photo, teacher_email, teacher_name, status } = course;
    return (
        <div className="card card-side bg-base-100 shadow-xl flex flex-col md:flex-row">
            <img src={photo} alt="" className="w-full md:w-1/3" />
            <div className="card-body">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="font-bold">Category: {category}</p>
                <p>{description}</p>
                <p className="font-medium">Price: ${price}</p>
                <div className="flex justify-start items-center gap-2">
                    <div className="w-16 h-16 rounded-full">
                        <img src={teacher_photo} alt="" className="h-full w-full rounded-full object-cover" />
                    </div>
                    <div>
                        <p className="font-medium">Name: {teacher_name}</p>
                        <p className="font-medium">Email: {teacher_email}</p>
                    </div>
                </div>
                <div className="card-actions justify-center mt-3">
                    <button disabled={status !== 'Accepted'} className="btn btn-secondary text-white font-bold">See Details</button>
                    <Link to={`/dashboard/update-classes/${_id}`}>
                        <button className="btn bg-green-500 text-white font-bold">Update</button>
                    </Link>
                    <button onClick={() => handleDeleteItem(_id)} className="btn bg-red-500 text-white font-bold">Delete</button>
                </div>
            </div>
        </div>
    );
};


MyClassCard.propTypes = {
    course: PropTypes.object,
    handleDeleteItem: PropTypes.func,
}

export default MyClassCard;