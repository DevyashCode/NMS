// import React from 'react';
// import { GridBackground } from './GridBackground';
// import ShinyText from '../ShinyText';
// import sdcLogo from './Images/sdclogo.png';
// import mitsLogo from "./Images/mits-logo.png";
// import sdcBanner from "./Images/sdcBanner.jpg";
// import { BackgroundGradient } from '../../ui/background-gradient';
// import SpotlightCard from './SpotlightCard';

// const data = [
//     {
//         title: "MITS",
//         subtitle: "Madhav Institute Of Technology And Science",
//         image: mitsLogo,
//         bannerImage: "https://raw.githubusercontent.com/rahulrawat95r/XamDruImg/main/loginbanner.jpg"
//     },
//     {
//         title: "SDC",
//         subtitle: "Software Development Club",
//         image: sdcLogo,
//         bannerImage:sdcBanner
//     }
// ]

// function AffiliatedWith(props) {
//     return (
//         <div className='w-full h-full bg-black'>
//             <GridBackground>
//                 <div className='h-full w-full z-20 text-center flex flex-col items-center'>
//                     <ShinyText text="Affiliation With" disabled={false} speed={6} className='text-5xl font-base' />
//                     <div className='w-[75%] mt-20 h-[80%] flex justify-center gap-20'>
//                         {data.map((element, index) => {
//                             return (
//                                 <BackgroundGradient containerClassName="h-[70%] w-[35%]" className='w-full h-full rounded-3xl'>
//                                     <SpotlightCard className='h-full w-full'>
//                                         <div className='h-full w-full bg-[#141414] border-2 border-white/20 rounded-2xl flex flex-col items-center gap-5 overflow-hidden pb-5'>
//                                             <img src={element.bannerImage} alt={"Banner Image"} className='h-[35%] w-full object-fill' />
//                                             <img src={element.image} alt={element.title} className='h-[30%] w-[30%] object-contain mt-[-80px]' />
//                                             <h3 className='text-5xl text-white/90 mt-[-20px]'>{element.title}</h3>
//                                             <div className='h-[20%] w-full px-10'>
//                                                 <h4 className='text-xl text-white/70'>{element.subtitle}</h4>
//                                             </div>
//                                             <button className='h-10 w-25 bg-violet-600 rounded-md text-white text-xs'>VISIT SITE</button>
//                                         </div>
//                                     </SpotlightCard>
//                                 </BackgroundGradient>
//                             )
//                         })}
//                     </div>
//                 </div>
//             </GridBackground>
//         </div>
//     );
// }

// export default AffiliatedWith;

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
        bannerImage: "https://raw.githubusercontent.com/rahulrawat95r/XamDruImg/main/loginbanner.jpg"
    },
    {
        title: "SDC",
        subtitle: "Software Development Club",
        image: sdcLogo,
        bannerImage: sdcBanner
    }
]

function AffiliatedWith(props) {
    return (
        <div className='w-full h-full bg-black'>
            <GridBackground>
                <div className='h-full w-full z-20 text-center flex flex-col items-center'>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <ShinyText text="Affiliation With" disabled={false} speed={6} className='text-5xl font-base' />
                    </motion.div>
                    
                    <div className='w-[75%] mt-20 h-[80%] flex justify-center gap-20'>
                        {data.map((element, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ 
                                        opacity: 0, 
                                        x: index === 0 ? -100 : 100 
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
                                >
                                    <BackgroundGradient containerClassName="h-[60vh] w-[28vw]" className='w-full h-full rounded-3xl'>
                                        <SpotlightCard className='h-full w-full'>
                                            <div key={index} className='h-full w-full bg-[#141414] border-2 border-white/20 rounded-2xl flex flex-col items-center gap-5 overflow-hidden pb-5'>
                                                <img src={element.bannerImage} alt={"Banner Image"} className='h-[35%] w-full object-fill' />
                                                <img src={element.image} alt={element.title} className='h-[30%] w-[30%] object-contain mt-[-80px]' />
                                                <h3 className='text-5xl text-white/90 mt-[-20px]'>{element.title}</h3>
                                                <div className='h-[20%] w-full px-10'>
                                                    <h4 className='text-xl text-white/70'>{element.subtitle}</h4>
                                                </div>
                                                <button className='h-10 w-25 bg-violet-600 rounded-md text-white text-xs'>VISIT SITE</button>
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
