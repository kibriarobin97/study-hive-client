import online from "../../assets/teaching/online-course.png"
import scholarship from "../../assets/teaching/scholarship.png"
import certification from "../../assets/teaching/certificate.png"

const Features = () => {
    return (
        <div className="my-10 max-w-6xl mx-auto">
            <div className="text-center">
                <h3 className="text-3xl font-bold mb-2">Awesome Feature</h3>
                <p className="w-1/2 mx-auto">Our interactive and engaging course content is designed to facilitate effective learning and retention</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                <div className="bg-[#F9F9FF] p-5 space-y-2 rounded-md hover:scale-[1.05] transition-all">
                    <img src={scholarship} alt="" className="w-16 h-16"/>
                    <h3 className="text-xl font-bold">Scholarship Facility</h3>
                    <p className="text-gray-400">Our Scholarship Facility offers an array of exceptional features designed to support students in their educational journey.</p>
                </div>
                <div className="bg-[#F9F9FF] p-5 space-y-2 rounded-md hover:scale-[1.05] transition-all">
                    <img src={online} alt="" className="w-16 h-16"/>
                    <h3 className="text-xl font-bold">Sell Online Course</h3>
                    <p className="text-gray-400">Enjoy a flexible learning experience with online modules that allowing you to study from anywhere in the world.</p>
                </div>
                <div className="bg-[#F9F9FF] p-5 space-y-2 rounded-md hover:scale-[1.05] transition-all">
                    <img src={certification} alt="" className="w-16 h-16"/>
                    <h3 className="text-xl font-bold">Global Certification</h3>
                    <p className="text-gray-400">Expand your reach and monetize your expertise with our comprehensive platform designed for selling online courses.</p>
                </div>
            </div>
        </div>
    );
};

export default Features;