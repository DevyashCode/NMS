import { BackgroundGradient } from "../../ui/background-gradient";
import SpotlightCard from "../AffiliatedWithSection/SpotlightCard";
import ShinyText from "../ShinyText";
import { motion } from 'framer-motion';
import Devyash from "./Images/Devyash.jpg";
import Utkarsh from "./Images/Utkarsh.jpg";
import Ansh from "./Images/Ansh.jpg";
import Suyash from "./Images/Suyash.jpg"

const team = [
    {
        name: "Utkarsh Gupta",
        designation: "Software Developer",
        linkedin: "",
        image: Utkarsh
    },
    {
        name: "Ansh Mittal",
        designation: "Software Developer",
        linkedin: "",
        image: Ansh
    },
    {
        name: "Devyash Rasela",
        designation: "Software Developer",
        linkedin: "",
        image: Devyash
    },
    {
        name: "Suyash Sharma",
        designation: "Software Developer",
        linkedin: "",
        image: Suyash
    },
]

function Team() {
    return (
        <div className='w-full min-h-screen bg-black py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8'>
            <div className='h-full w-full z-20 text-center flex flex-col items-center'>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="mb-12 sm:mb-16 lg:mb-20"
                >
                    <ShinyText 
                        text="Our Team" 
                        disabled={false} 
                        speed={6} 
                        className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-base' 
                    />
                </motion.div>

                {/* Team Grid */}
                <div className='w-full max-w-[95%] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10'>
                    {team.map((element, index) => {
                        return (
                            <motion.div
                                key={index}
                                initial={{
                                    opacity: 0,
                                    y: 50
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0
                                }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeOut",
                                    delay: index * 0.1
                                }}
                                viewport={{ once: true, amount: 0.2 }}
                                className="w-full max-w-md mx-auto"
                            >
                                <BackgroundGradient 
                                    containerClassName="h-[400px] sm:h-[450px] lg:h-[500px] w-full" 
                                    className='w-full h-full rounded-2xl sm:rounded-3xl'
                                >
                                    <SpotlightCard className='h-full w-full'>
                                        <div className='h-full w-full bg-[#141414] border border-white/20 sm:border-2 rounded-xl sm:rounded-2xl flex flex-col items-center overflow-hidden pt-6 sm:pt-8 lg:pt-12 pb-4 sm:pb-5'>
                                            {/* Name and Designation */}
                                            <div className="text-center mb-4 sm:mb-6">
                                                <h3 className='text-lg sm:text-xl lg:text-2xl text-white/90 font-semibold mb-1 sm:mb-2'>
                                                    {element.name}
                                                </h3>
                                                <h4 className='text-sm sm:text-base text-white/70'>
                                                    {element.designation}
                                                </h4>
                                            </div>

                                            {/* Profile Image */}
                                            <div className="w-[50%] sm:w-[55%] lg:w-[60%] h-[80%] sm:h-[80%] lg:h-[80%] rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 shadow-2xl">
                                                <img 
                                                    src={element.image} 
                                                    alt={element.name} 
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                            </div>

                                            {/* LinkedIn Button */}
                                            <button className='h-9 sm:h-10 px-4 sm:px-6 bg-violet-600 hover:bg-violet-700 rounded-md sm:rounded-lg text-white text-xs sm:text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105'>
                                                LinkedIn
                                            </button>
                                        </div>
                                    </SpotlightCard>
                                </BackgroundGradient>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Team;
