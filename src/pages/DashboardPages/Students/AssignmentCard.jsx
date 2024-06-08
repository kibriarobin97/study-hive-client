import { useEffect, useState } from "react";
import PropTypes from 'prop-types'

const AssignmentCard = ({ classes }) => {

    const [assignments, setAssignments] = useState([])

   console.log(assignments)
   useEffect(() => {
        fetch(`http://localhost:5000/assignment/${classes?.classId}`)
        .then(res => res.json())
        .then(data => setAssignments(data))
   },[classes?.classId])


    return (
        <div>
            <div className="text-center flex justify-evenly items-center">
                <h2 className="lg:text-2xl text-xl font-semibold">Total Assignment: {assignments?.length}</h2>
            </div>
            <div>
                <div className="overflow-x-auto mt-8">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="bg-secondary">
                                <th><p className="text-white">#</p></th>
                                <th><p className="uppercase text-white">Title</p></th>
                                <th><p className="uppercase text-white">description</p></th>
                                <th><p className="uppercase text-white">Deadline</p></th>
                                <th><p className="uppercase text-white">Action</p></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                assignments?.map((assignment, idx) => <tr key={assignment._id}>
                                    <td>
                                        {idx + 1}
                                    </td>
                                    <td>
                                        {assignment?.assignmentTitle}
                                    </td>
                                    <td>
                                        {assignment?.description}
                                    </td>
                                    <td>
                                        {assignment?.deadline}
                                    </td>
                                    <td>
                                        <button
                                            disabled={assignment?.status !== 'Pending'}
                                            className="btn btn-success btn-sm text-white">
                                            Submit
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

AssignmentCard.propTypes = {
    classes: PropTypes.object,
}

export default AssignmentCard;