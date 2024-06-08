import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth";
import defaultProfile from "../../assets/teaching/user.png"
import logo from "../../assets/teaching/logo.jpeg"

const NavBar = () => {

    const { user, logOut } = useAuth()

    const navLinks = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/all-classes'>All Classes</Link></li>
        {
            user && <li><Link to='/teach'>Teach on Study Hive</Link></li>
        }
    </>


    const handleLogOut = () => {
        logOut()
            .then(() => console.log('log out'))
            .catch(error => console.error(error))
    }

    return (
        <div className="navbar bg-black bg-opacity-25 text-white fixed z-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-400 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <div className="flex">
                    
                    <Link to='/' className="btn btn-ghost text-xl font-bold">
                        <img src={logo} alt="" className='h-6 w-6' />
                        Study Hive
                    </Link>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <div className="flex justify-center items-center gap-1">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-20 rounded-full">
                                    <img alt="User Photo" src={user?.photoURL || defaultProfile} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-slate-600 bg-opacity-50 rounded-box w-40">
                                <li><button disabled className="font-bold hover:bg-primary">{user?.displayName || 'User Name'}</button></li>
                                <li className="font-bold hover:bg-primary rounded-lg"><Link to='/dashboard'>Dashboard</Link></li>
                                <li><button onClick={handleLogOut} className="font-bold hover:bg-primary">Log Out</button></li>
                            </ul>
                        </div>
                    </div> : <Link to='/login'>
                        <button className="btn btn-secondary btn-sm">Sign In</button>
                    </Link>
                }

            </div>
        </div>
    );
};

export default NavBar;