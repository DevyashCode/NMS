import React, { useState } from 'react';
import mitsLogo from "../Navbar/Nav Icons/mits-logo.png"

export default function LandingNav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu after clicking
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="fixed w-[90%] sm:w-[80%] md:w-[80%] lg:w-[70%] xl:w-[70%] h-[50px] sm:h-[65px] md:h-[70px] lg:h-[75px] xl:h-[8%] top-3 sm:top-4 md:top-6 lg:top-8 xl:top-10 left-[5.3%] sm:left-[10%] md:left-[10%] lg:left-[15%] xl:left-[15vw] bg-black/60 backdrop-blur-md z-50 rounded-[25px] sm:rounded-[30px] md:rounded-[35px] lg:rounded-[40px] xl:rounded-[45px] border-2 border-white/30 flex px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 justify-between items-center shadow-lg">
                
                {/* Logo */}
                <div className="flex items-center">
                    <img 
                        src={mitsLogo} 
                        className="w-[40px] sm:w-[45px] md:w-[50px] lg:w-[50px] xl:w-[35%] h-[80%] object-contain" 
                        alt="MITS Logo"
                    />
                </div>
                
                {/* Desktop Navigation - Hidden on smaller screens */}
                <div className="hidden lg:flex w-[60%] xl:w-[50%] h-full">
                    <ul className="text-white/80 flex h-full w-full justify-around items-center text-sm lg:text-base xl:text-lg">
                        <li className="hover:text-white/90 cursor-pointer transition-colors duration-200">
                            <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
                        </li>
                        <li className="hover:text-white/90 cursor-pointer transition-colors duration-200">
                            <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a>
                        </li>
                        <li className="hover:text-white/90 cursor-pointer transition-colors duration-200">
                            <a href="#affiliation" onClick={(e) => handleNavClick(e, 'affiliation')}>Affiliations</a>
                        </li>
                        <li className="hover:text-white/90 cursor-pointer transition-colors duration-200">
                            <a href="#team" onClick={(e) => handleNavClick(e, 'team')}>Team</a>
                        </li>
                        <li className="hover:text-white/90 cursor-pointer transition-colors duration-200">
                            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
                        </li>
                    </ul>
                </div>

                {/* Mobile Menu Button - Visible on smaller screens */}
                <button 
                    onClick={toggleMenu}
                    className="lg:hidden flex flex-col justify-center items-center w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 space-y-1 hover:opacity-80 transition-all duration-300 focus:outline-none"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                >
                    <span className={`block w-5 sm:w-6 h-0.5 bg-white/80 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                    <span className={`block w-5 sm:w-6 h-0.5 bg-white/80 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-5 sm:w-6 h-0.5 bg-white/80 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </button>
            </nav>

            {/* Mobile Menu Dropdown */}
            <div className={`lg:hidden fixed top-[70px] sm:top-[75px] md:top-[85px] left-[2.5%] sm:left-[7.5%] md:left-[10%] right-[2.5%] sm:right-[7.5%] md:right-[10%] bg-black/90 backdrop-blur-lg border-2 border-white/30 rounded-xl sm:rounded-2xl z-40 transition-all duration-300 shadow-xl ${isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                <ul className="py-2 sm:py-3 md:py-4">
                    <li className="border-b border-white/10 last:border-b-0">
                        <a 
                            href="#home" 
                            onClick={(e) => handleNavClick(e, 'home')}
                            className="block py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base md:text-lg text-white/80 hover:text-white/90 hover:bg-white/5 rounded-lg transition-all duration-200 cursor-pointer"
                        >
                            Home
                        </a>
                    </li>
                    <li className="border-b border-white/10 last:border-b-0">
                        <a 
                            href="#about" 
                            onClick={(e) => handleNavClick(e, 'about')}
                            className="block py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base md:text-lg text-white/80 hover:text-white/90 hover:bg-white/5 rounded-lg transition-all duration-200 cursor-pointer"
                        >
                            About
                        </a>
                    </li>
                    <li className="border-b border-white/10 last:border-b-0">
                        <a 
                            href="#affiliation" 
                            onClick={(e) => handleNavClick(e, 'affiliation')}
                            className="block py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base md:text-lg text-white/80 hover:text-white/90 hover:bg-white/5 rounded-lg transition-all duration-200 cursor-pointer"
                        >
                            Affiliations
                        </a>
                    </li>
                    <li className="border-b border-white/10 last:border-b-0">
                        <a 
                            href="#team" 
                            onClick={(e) => handleNavClick(e, 'team')}
                            className="block py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base md:text-lg text-white/80 hover:text-white/90 hover:bg-white/5 rounded-lg transition-all duration-200 cursor-pointer"
                        >
                            Team
                        </a>
                    </li>
                    <li className="border-b border-white/10 last:border-b-0">
                        <a 
                            href="#contact" 
                            onClick={(e) => handleNavClick(e, 'contact')}
                            className="block py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base md:text-lg text-white/80 hover:text-white/90 hover:bg-white/5 rounded-lg transition-all duration-200 cursor-pointer"
                        >
                            Contact
                        </a>
                    </li>
                </ul>
            </div>

            {/* Backdrop overlay for mobile menu */}
            {isMenuOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
                    onClick={() => setIsMenuOpen(false)}
                    aria-hidden="true"
                ></div>
            )}
        </>
    );
}
