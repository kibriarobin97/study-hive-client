import googlePhoto from "../../assets/sponsors/google.png"
import amazonPhoto from "../../assets/sponsors/amazon.png"
import figmaPhoto from "../../assets/sponsors/figma.png"
import spotifyPhoto from "../../assets/sponsors/spotify.png"
import telegramPhoto from "../../assets/sponsors/telerama.png"

const Partner = () => {
    return (
        <div className="w-4/5 mx-auto my-10">
            <div className="text-center">
                <h3 className="text-3xl font-bold mb-2">Our Partners</h3>
                <p className="md:w-1/2 mx-auto">We are proud to collaborate with a diverse group of esteemed partners and sponsors who share our commitment to education and innovation.</p>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-10 mt-10">
                <img src={googlePhoto} alt="" className="w-24"/>
                <img src={amazonPhoto} alt="" className="w-24"/>
                <img src={figmaPhoto} alt="" className="w-24"/>
                <img src={spotifyPhoto} alt="" className="w-24"/>
                <img src={telegramPhoto} alt="" className="w-24"/>
            </div>
        </div>
    );
};

export default Partner;