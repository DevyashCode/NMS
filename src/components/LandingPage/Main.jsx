import LandingNav from "./LandingNav";
import Hero from "./Hero";
import AboutUs from "./AboutUs";
import AffiliatedWith from "./AffiliatedWithSection/AffiliatedWith";
import Team from "./Team/Team";
import Features from "./Features/Features";
import Footer from "./Footer/Footer";
import LoginPopup from "../Login/LoginPopup";
import { useState } from "react";

export default function Main() {
    const [showPopup, setShowPopup] = useState(false);
    const handleLoginClick = (selectedIp) => {
        setShowPopup(true);
    };
    const handlePopupClose = () => {
        setShowPopup(false);
    }
    return (
        <div className="h-full min-w-full bg-black">
            <LandingNav />
            {showPopup && <LoginPopup handlePopupClose={handlePopupClose} />}
            <section id="home" className="h-full w-full">
                <Hero handleLoginClick={handleLoginClick} />
            </section>
            <section id="about">
                <AboutUs />
            </section>
            <section id="affiliation">
                <AffiliatedWith />
            </section>
            <section id="team">
                <Team />
            </section>
            <section id="features">
                <Features />
            </section>
            <section id="contact">
                <Footer />
            </section>
        </div>
    );
}
