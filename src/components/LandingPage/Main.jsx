import LandingNav from "./LandingNav";
import Hero from "./Hero";
import AboutUs from "./AboutUs";
import AffiliatedWith from "./AffiliatedWithSection/AffiliatedWith";
import Team from "./Team/Team";
import Features from "./Features/Features";
import Footer from "./Footer/Footer";

export default function Main() {
    return (
        <div className="h-full min-w-full bg-black">
            <LandingNav/>
            <section id="home" className="h-full w-full">
                <Hero />
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
