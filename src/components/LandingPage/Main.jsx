import Hero from "./Hero";
import AboutUs from "./AboutUs";
import AffiliatedWith from "./AffiliatedWithSection/AffiliatedWith";
import Team from "./Team/Team";
import Features from "./Features/Features";
import Footer from "./Footer/Footer";

export default function Main() {
    return (
        <div className="h-full w-full bg-black">
            <Hero/>
            <AboutUs/>
            <AffiliatedWith/>
            <Team/>
            <Features/>
            <Footer/>
        </div>
    );
}
