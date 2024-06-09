import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PropTypes from 'prop-types';

const SubmitAssignment = ({assignment, classes, idx, reload, setReload}) => {

    const {_id, assignmentTitle, description, title, deadline, category} = assignment;

    const axiosSecure = useAxiosSecure()

    const { mutateAsync } = useMutation({
        mutationFn: async assignmentData => {
            const { data } = await axiosSecure.put(`/submit-assignment/${_id}`, assignmentData)
            return data
        },
        onSuccess: () => {
            toast.success('Assignment submitted')
        }
    })

    const handleSubmit = async (id) => {
        const assignmentId = id;
        const status = 'Submitted';
        const classId = classes?.classId;

        const submitInfo = {
            assignmentId,
            classId,
            category,
            deadline,
            description,
            title,
            status
        }

        await mutateAsync(submitInfo)
        setReload(!reload)
    }

    return (
        <tr>
            <td>
                {idx + 1}
            </td>
            <td>
                {assignmentTitle}
            </td>
            <td>
                {description}
            </td>
            <td>
                {deadline}
            </td>
            <td>
                <button
                    onClick={() => handleSubmit(_id)}
                    className="btn btn-success btn-sm text-white">
                    Submit
                </button>
            </td>
        </tr>
    );
};

SubmitAssignment.propTypes = {
    assignment: PropTypes.object,
    classes: PropTypes.object,
    idx: PropTypes.number,
    reload: PropTypes.bool,
    setReload: PropTypes.bool,
}

export default SubmitAssignment;