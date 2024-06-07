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
import MyEnrollClass from "../pages/DashboardPages/Students/MyEnrollClass";
import AllClassesAdmin from "../pages/DashboardPages/Admin/AllClassesAdmin";
import TeacherRequest from "../pages/DashboardPages/Admin/TeacherRequest";
import AllUser from "../pages/DashboardPages/Admin/AllUser";
import UpdateClasses from "../pages/DashboardPages/Teachers/UpdateClasses";
import Payment from "../pages/Payment/Payment";
import MyClassDetails from "../pages/DashboardPages/Teachers/MyClassDetails";
import Assignment from "../pages/DashboardPages/Students/Assignment";
import SeeReview from "../pages/DashboardPages/Admin/SeeReview";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import TeacherRoute from "./TeacherRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
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
                element: <PrivateRoute><ClassDetails></ClassDetails></PrivateRoute>
            },
            {
                path: '/teach',
                element: <PrivateRoute><TeachOn></TeachOn></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/payment/:id',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '/dashboard',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },

            // teacher route
            {
                path: 'add-class',
                element: <TeacherRoute><AddClass></AddClass></TeacherRoute>
            },
            {
                path: 'my-class',
                element: <TeacherRoute><MyClass></MyClass></TeacherRoute>
            },
            {
                path: 'update-classes/:id',
                element: <TeacherRoute><UpdateClasses></UpdateClasses></TeacherRoute>
            },
            {
                path: 'my-class-details/:id',
                element: <TeacherRoute><MyClassDetails></MyClassDetails></TeacherRoute>
            },

            // student route
            {
                path: 'my-enroll-class',
                element: <PrivateRoute><MyEnrollClass></MyEnrollClass></PrivateRoute>
            },
            {
                path: 'assignment/:id',
                element: <PrivateRoute><Assignment></Assignment></PrivateRoute>
            },

            // admin route
            {
                path: 'all-classes-admin',
                element: <AdminRoute><AllClassesAdmin></AllClassesAdmin></AdminRoute>
            },
            {
                path: 'teacher-request',
                element: <AdminRoute><TeacherRequest></TeacherRequest></AdminRoute>
            },
            {
                path: 'all-users',
                element: <AdminRoute><AllUser></AllUser></AdminRoute>
            },
            {
                path: 'see-review/:id',
                element: <AdminRoute><SeeReview></SeeReview></AdminRoute>
            }
        ]
    }

])

export default router;