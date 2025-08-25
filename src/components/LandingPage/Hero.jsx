import Particles from "./Particles";
import Spotlight from "./spotlight-new";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import ShinyText from "./ShinyText";
import { NavLink } from "react-router-dom";

// function  Hero({handleLoginClick}) {
function  Hero() {
    return (
        <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={300}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
            className="overflow-hidden"
        >
            <div className="h-full w-full rounded-md flex md:items-center md:justify-center antialiased absolute flex-col">
                <Spotlight />
                <div className="max-w-7xl mx-auto relative z-10 w-full pt-55 md:pt-0">
                    <h1 className="text-3xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                        NMS <br /> Network Management System
                    </h1>
                    <div className="w-full mt-3 flex justify-center text-center ">
                        <ShinyText text="Streamline, Secure, Simplify: Your Network, Perfected." disabled={false} speed={3} className='text-xl font-semibold' />
                    </div>
                </div>
                {/* <div className="mt-5 flex justify-center text-center" onClick={handleLoginClick}> */}
                <div className="mt-5 flex justify-center text-center">
                    <HoverBorderGradient
                        containerClassName="rounded-full"
                        as="button"
                        className="text-white flex items-center space-x-2 border-2 border-[#363636] w-30 justify-center"
                    >
                        <NavLink to="/user" className="text-xl font-semibold">Login</NavLink>
                        {/* <span className="text-xl font-semibold">Login</span> */}
                    </HoverBorderGradient>
                </div>
            </div>
        </Particles>
    );
}

export default Hero;
