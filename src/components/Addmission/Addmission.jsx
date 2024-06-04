import { Link } from "react-router-dom";

const Addmission = () => {
    return (
        <div className="hero min-h-72 md:min-h-96 my-10" style={{ backgroundImage: 'url(https://i.ibb.co/rF6mHvF/baim-hanif-p-YWu-OMhtc6k-unsplash.jpg)' }}>
            <div className="hero-overlay object-cover bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-3 text-3xl font-bold">Addmission are now open</h1>
                    <p className="mb-5">Enroll now and start your learning journey with us! Our expert-led courses offer flexible online and hybrid options to fit your schedule.</p>
                    <div className="flex justify-center items-center gap-0">
                        <Link to='/all-classes'>
                            <button className="btn btn-secondary font-bold text-white">Enroll Now</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Addmission;