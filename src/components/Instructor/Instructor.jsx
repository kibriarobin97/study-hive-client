import { Link } from "react-router-dom";
import teaching from "../../assets/teaching/teaching.jpg"

const Instructor = () => {
    return (
        <div className="max-w-7xl mx-auto md:flex gap-8 justify-center items-center my-20">
            <div className="w-2/3 md:w-1/2 mx-auto">
                <img src={teaching} alt="" className="w-full object-cover" />
            </div>
            <div className="w-2/3 mx-auto md:w-1/2 space-y-3 text-center md:text-start">
                <h3 className="text-2xl font-semibold text-center md:text-start mt-3 md:mt-0">Become an Instructor</h3>
                <p className="text-center md:text-start">With user-friendly navigation, interactive content, and expert instructors, you have everything you need to succeed. Don’t wait any longer—start your class today and unlock a world of knowledge and opportunity. Your path to growth and achievement begins here.</p>
                <div>
                    <Link><button className="btn btn-primary font-bold md:mt-5 mt-2">Start Teaching Today</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Instructor;