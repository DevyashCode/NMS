import { GridBackground } from "../AffiliatedWithSection/GridBackground";
import { motion } from 'framer-motion';
import { MdSpeed } from "react-icons/md";
import { MdDevices } from "react-icons/md";
import { MdNetworkPing } from "react-icons/md";
import ShinyText from '../ShinyText';

const features = [
    {
        icon: <MdSpeed className="text-violet-600 h-full w-full"/>,
        heading: "Server Speed Test",
        content: "The Wifi Speed Test feature allows real-time andThe WiFi Speed Test feature allows real-time and scheduled testing of upload, download, and latency, with historical logging and graphical results. It provides alerts for slow or unstable performance to ensure optimal network health."
    }, 
    {
        icon: <MdNetworkPing className="text-violet-600 h-full w-full"/>,
        heading: "IP Ping Monitoring",
        content: "IP Ping Monitoring continuously checks device status with configurable intervals, visual indicators, and alerts for issues. It also logs data for analyzing network performance trends."
    }, 
    {
        icon: <MdDevices className="text-violet-600 h-full w-full"/>,
        heading: "Network Device Management",
        content: "Network Device Management automatically finds all connected devices and provides a centralized dashboard for monitoring. It offers real-time updates ."
    },
]

function Features(props) {
    return (
        <div className='w-full min-h-screen bg-black py-8 sm:py-12 lg:py-16'>
            <GridBackground>
                <div className='h-full w-full z-20 text-center flex flex-col items-center px-4 sm:px-6 lg:px-8'>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="mb-8 sm:mb-12 lg:mb-16"
                    >
                        <ShinyText 
                            text="Features" 
                            disabled={false} 
                            speed={6} 
                            className='text-3xl sm:text-4xl lg:text-5xl font-base' 
                        />
                        <h4 className="text-white/40 text-base sm:text-lg lg:text-xl mt-2">
                            Features provided by NMS are
                        </h4>
                    </motion.div>
                    
                    {/* Desktop and Tablet Layout */}
                    <div className="hidden md:flex w-full max-w-7xl justify-center gap-6 lg:gap-8">
                        {features.map((element, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ 
                                        opacity: 0, 
                                        x: index === 0 ? -100 : index === 1 ? 0 : 100 
                                    }}
                                    whileInView={{ 
                                        opacity: 1, 
                                        x: 0 
                                    }}
                                    transition={{ 
                                        duration: 0.8, 
                                        ease: "easeOut",
                                        delay: index * 0.2
                                    }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    className="flex-1 max-w-sm rounded-2xl py-6 lg:py-10 text-left"
                                >
                                    <div className="h-12 w-12 lg:h-16 lg:w-16 rounded-2xl mb-4">
                                        {element.icon}
                                    </div>
                                    <h2 className="text-white text-lg lg:text-2xl mb-3 px-2 lg:px-4">
                                        {element.heading}
                                    </h2>
                                    <p className="text-white/60 text-xs lg:text-sm leading-relaxed px-2 lg:px-4">
                                        {element.content}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden w-full max-w-md space-y-6">
                        {features.map((element, index) => {
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
                                        delay: index * 0.15
                                    }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    className="w-full bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-left border border-white/10"
                                >
                                    <div className="h-10 w-10 rounded-xl mb-4 flex items-center justify-center bg-violet-600/10">
                                        <div className="h-6 w-6">
                                            {element.icon}
                                        </div>
                                    </div>
                                    <h2 className="text-white text-lg font-semibold mb-3">
                                        {element.heading}
                                    </h2>
                                    <p className="text-white/70 text-sm leading-relaxed">
                                        {element.content}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </GridBackground>
        </div>
    );
}

export default Features;
