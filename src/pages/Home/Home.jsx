import Banner from "../../components/Banner/Banner";
import Instructor from "../../components/Instructor/Instructor";
import Partner from "../../components/Partner/Partner";
import Review from "../../components/Reviews/Review";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Partner></Partner>
            <Instructor></Instructor>
            <Review></Review>
        </div>
    );
};

export default Home;