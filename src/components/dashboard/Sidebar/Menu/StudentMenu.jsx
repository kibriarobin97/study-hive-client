import { FaAddressBook } from "react-icons/fa";
import MenuItem from "./MenuItem";

const StudentMenu = () => {
    return (
        <MenuItem
            label='My Enroll Class'
            address='my-enroll-class'
            icon={FaAddressBook}
        ></MenuItem>
    );
};

export default StudentMenu;