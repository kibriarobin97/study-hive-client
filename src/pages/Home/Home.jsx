import Addmission from "../../components/Addmission/Addmission";
import Banner from "../../components/Banner/Banner";
import Features from "../../components/Features/Features";
import Instructor from "../../components/Instructor/Instructor";
import Partner from "../../components/Partner/Partner";
import PopularClass from "../../components/PopularClass/PopularClass";
import Review from "../../components/Reviews/Review";
import ShowCard from "../../components/ShowCard/ShowCard";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Partner></Partner>
            <PopularClass></PopularClass>
            <Instructor></Instructor>
            <Features></Features>
            <ShowCard></ShowCard>
            <Review></Review>
            <Addmission></Addmission>
        </div>
    );
};

export default Home;