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
        <div className='w-full h-[80%] bg-black'>
            <GridBackground>
                <div className='h-full w-full z-20 text-center flex flex-col items-center'>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <ShinyText text="Features" disabled={false} speed={6} className='text-5xl font-base' />
                        <h4 className="text-white/40 text-xl mt-2">Features provided by NMS are</h4>
                    </motion.div>
                    <div className="h-[50%] w-[80%] mt-10 rounded-xl flex justify-around">
                        {features.map((element,index)=>{
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
                                    className="h-full w-[30%] rounded-2xl py-10 text-left"
                                >
                                    <div className="h-[25%] w-[40%] rounded-2xl">
                                        {element.icon}
                                    </div>
                                    <h2 className="text-white text-2xl mt-2 px-10">{element.heading}</h2>
                                    <p className="text-white/60 text-sm mt-2 px-10">{element.content}</p>
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
