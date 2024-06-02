import MenuItem from "./MenuItem";
import { FaAddressBook, FaChalkboardTeacher } from "react-icons/fa";

const TeacherMenu = () => {
    return (
        <>
            <MenuItem
                label='Add Class'
                address='add-class'
                icon={FaAddressBook}
            ></MenuItem>

            <MenuItem
                label='My Class'
                address='my-class'
                icon={FaChalkboardTeacher}
            ></MenuItem>
        </>
    );
};

export default TeacherMenu;