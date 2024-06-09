import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import SubmitAssignment from "./SubmitAssignment";

const AssignmentCard = ({ classes }) => {

    const [assignments, setAssignments] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        fetch(`https://study-hive-server.vercel.app/assignment/${classes?.classId}`)
            .then(res => res.json())
            .then(data => setAssignments(data))
    }, [classes?.classId, reload])

    

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
                                assignments?.map((assignment, idx) => <SubmitAssignment
                                key={assignment?._id}
                                assignment={assignment}
                                idx={idx}
                                reload={reload}
                                setReload={setReload}
                                classes={classes}
                                ></SubmitAssignment>) 
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