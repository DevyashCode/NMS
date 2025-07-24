import Hero from "./Hero";
import AboutUs from "./AboutUs";
import AffiliatedWith from "./AffiliatedWithSection/AffiliatedWith";
import Team from "./Team/Team";
import Features from "./Features/Features";
import Footer from "./Footer/Footer";

export default function Main() {
    return (
        <div className="h-full w-full bg-black">
            <section id="home" className="h-full w-full">
                <Hero />
            </section>
            <section id="about">
                <AboutUs />
            </section>
            <section id="affiliation" className="h-full w-full">
                <AffiliatedWith />
            </section>
            <section id="team" className="h-full w-full">
                <Team />
            </section>
            <section id="features" className="w-full h-[80%]">
                <Features />
            </section>
            <section id="contact" className="w-full h-[50%]">
                <Footer />
            </section>
        </div>
    );
}
