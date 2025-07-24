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
        <div className='w-full h-full bg-black'>
                <div className='h-full w-full z-20 text-center flex flex-col items-center'>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <ShinyText text="Our Team" disabled={false} speed={6} className='text-5xl font-base' />
                    </motion.div>

                    <div className='w-[95%] mt-20 flex justify-between'>
                        {team.map((element, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    initial={{
                                        opacity: 0,
                                        x: index < 2 ? -100 : 100
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        x: 0
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        ease: "easeOut",
                                        delay: index * 0.15
                                    }}
                                    viewport={{ once: true, amount: 0.3 }}
                                >
                                    <BackgroundGradient containerClassName="h-[55vh] w-[22vw]" className='w-full h-full rounded-3xl'>
                                        <SpotlightCard className='h-full w-full'>
                                            <div className='h-full w-full bg-[#141414] border-2 border-white/20 rounded-2xl flex flex-col items-center overflow-hidden pt-12 pb-5'>
                                                <h3 className='text-2xl text-white/90 mt-[-20px]'>{element.name}</h3>
                                                <h4 className='text-md text-white/70'>{element.designation}</h4>
                                                <div className="w-[60%] h-[70%] rounded-2xl overflow-hidden mt-6">
                                                    <img src={element.image} alt={element.name} className="w-full h-full object-cover" />
                                                </div>
                                                <button className='h-10 w-25 bg-violet-600 rounded-md text-white text-sm mt-6'>LinkedIn</button>
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
