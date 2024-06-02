import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllClasses from "../pages/AllClasses/AllClasses";
import DashboardLayout from "../Root/DashboardLayout";
import AddClass from "../pages/DashboardPages/Teachers/AddClass";
import MyClass from "../pages/DashboardPages/Teachers/MyClass";
import Profile from "../pages/DashboardPages/Common/Profile";
import ClassDetails from "../pages/ClassDetails/ClassDetails";
import TeachOn from "../pages/TeachOn/TeachOn";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/all-classes',
                element: <AllClasses></AllClasses>
            },
            {
                path: '/class-details/:id',
                element: <ClassDetails></ClassDetails>
            },
            {
                path: '/teach',
                element: <TeachOn></TeachOn>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '/dashboard',
                element: <Profile></Profile>
            },
            {
                path: 'add-class',
                element: <AddClass></AddClass>
            },
            {
                path: 'my-class',
                element: <MyClass></MyClass>
            }
        ]
    }

])

export default router;