import React from 'react';
import { motion } from 'framer-motion';
import { GridBackground } from './GridBackground';
import ShinyText from '../ShinyText';
import sdcLogo from './Images/sdclogo.png';
import mitsLogo from "./Images/mits-logo.png";
import sdcBanner from "./Images/sdcBanner.jpg";
import { BackgroundGradient } from '../../ui/background-gradient';
import SpotlightCard from './SpotlightCard';

const data = [
    {
        title: "MITS",
        subtitle: "Madhav Institute Of Technology And Science",
        image: mitsLogo,
        bannerImage: "https://raw.githubusercontent.com/rahulrawat95r/XamDruImg/main/loginbanner.jpg",
        websiteUrl: "https://web.mitsgwalior.in/"
    },
    {
        title: "SDC",
        subtitle: "Software Development Club",
        image: sdcLogo,
        bannerImage: sdcBanner,
        websiteUrl: "https://sdc.mitsgwalior.in/"
    }
]

function AffiliatedWith() {
    return (
        <div className='min-w-full min-h-screen bg-black py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 flex flex-col'>
            <GridBackground>
                <div className='h-full min-w-full z-20 text-center flex flex-col items-center'>
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="mb-12 sm:mb-16 lg:mb-20"
                    >
                        <ShinyText 
                            text="Affiliation With" 
                            disabled={false} 
                            speed={6} 
                            className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-base' 
                        />
                    </motion.div>
                    
                    {/* Cards Container */}
                    <div className='w-full max-w-7xl flex flex-col lg:flex-row justify-center items-center gap-8 sm:gap-12 lg:gap-16 xl:gap-20'>
                        {data.map((element, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ 
                                        opacity: 0, 
                                        y: 50, // Changed to y for mobile
                                        x: window.innerWidth >= 1024 ? (index === 0 ? -100 : 100) : 0 // x only on desktop
                                    }}
                                    whileInView={{ 
                                        opacity: 1, 
                                        y: 0,
                                        x: 0 
                                    }}
                                    transition={{ 
                                        duration: 0.8, 
                                        ease: "easeOut",
                                        delay: index * 0.2
                                    }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl"
                                >
                                    <BackgroundGradient 
                                        containerClassName="h-[450px] sm:h-[500px] lg:h-[550px] xl:h-[600px] w-full" 
                                        className='w-full h-full rounded-2xl sm:rounded-3xl'
                                    >
                                        <SpotlightCard className='h-full w-full'>
                                            <div className='h-full w-full bg-[#141414] border border-white/20 sm:border-2 rounded-xl sm:rounded-2xl flex flex-col items-center overflow-hidden'>
                                                {/* Banner Image */}
                                                <div className="h-[35%] w-full overflow-hidden">
                                                    <img 
                                                        src={element.bannerImage} 
                                                        alt="Banner Image" 
                                                        className='h-full w-full object-cover'
                                                        loading="lazy"
                                                    />
                                                </div>
                                                
                                                {/* Logo */}
                                                <div className="relative -mt-12 sm:-mt-16 lg:-mt-20 z-10 mb-4 sm:mb-6">
                                                    <div className="bg-[#141414] rounded-full p-2 sm:p-3 lg:p-4 border border-white/20">
                                                        <img 
                                                            src={element.image} 
                                                            alt={element.title} 
                                                            className='h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 xl:h-28 xl:w-28 object-contain'
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                </div>
                                                
                                                {/* Title */}
                                                <h3 className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white/90 font-bold mb-3 sm:mb-4'>
                                                    {element.title}
                                                </h3>
                                                
                                                {/* Subtitle */}
                                                <div className='flex-1 w-full px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-center'>
                                                    <h4 className='text-sm sm:text-base lg:text-lg xl:text-xl text-white/70 text-center leading-relaxed'>
                                                        {element.subtitle}
                                                    </h4>
                                                </div>
                                                
                                                {/* Button */}
                                                <div className="pb-6 sm:pb-8">
                                                    <button className='h-10 sm:h-12 px-6 sm:px-8 bg-violet-600 hover:bg-violet-700 rounded-md sm:rounded-lg text-white text-xs sm:text-sm font-medium transition-colors duration-200 shadow-lg hover:shadow-xl'
                                                        onClick={() => window.open(element.websiteUrl, "_blank")}
                                                    >
                                                        VISIT SITE
                                                    </button>
                                                </div>
                                            </div>
                                        </SpotlightCard>
                                    </BackgroundGradient>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </GridBackground>
        </div>
    );
}

export default AffiliatedWith;
