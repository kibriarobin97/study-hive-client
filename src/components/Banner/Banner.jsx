import { Link } from "react-router-dom";
import banner from "../../assets/banner.jpg"

const Banner = () => {
    return (
        <div className="hero min-h-[300px] lg:min-h-[500px]" style={{ backgroundImage: `url(${banner})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-full lg:max-w-xl pt-14 lg:pt-0">
                    <h1 className="mb-3 text-2xl lg:text-3xl font-bold">Unlock Your Potential with <span className="text-yellow-500">Study Hive</span> Online Courses</h1>
                    <p className="mb-5">Transform the way you learn with Study Hive. Our user-friendly platform offers a flexible and personalized learning experience, allowing you to study at your own pace and on your own schedule.</p>
                    <Link to='/all-classes'><button className="btn btn-primary font-bold">Browse Classes</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;