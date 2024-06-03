import { RiContactsBookLine } from "react-icons/ri";
import MenuItem from "./MenuItem";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";

const AdminMenu = () => {
    return (
        <>
            <MenuItem
                label='All Classes'
                address='all-classes-admin'
                icon={RiContactsBookLine}
            ></MenuItem>

            <MenuItem
                label='Teacher Request'
                address='teacher-request'
                icon={IoPersonAddSharp}
            ></MenuItem>

            <MenuItem
                label='Users'
                address='all-users'
                icon={FaUsers}
            ></MenuItem>
        </>
    );
};

export default AdminMenu;