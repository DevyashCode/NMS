import { Outlet } from "react-router-dom";
import mitsLogo from "../Navbar/Nav Icons/mits-logo.png"

export default function LandingNav() {
    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <div className="h-full w-full flex-col">
            <div className="fixed w-[70%] h-[8%] top-10 left-[15vw] right-0 min-h-17 bg-black/50 z-25 rounded-[45px] border-2 border-white/30 flex px-10 justify-between">
                <img src={mitsLogo} className="w-[7%] h-full" />
                <div className="w-[50%] h-full">
                    <ul className="text-white/80 flex h-full w-full justify-around items-center text-lg">
                        <li className="hover:text-white/90 cursor-pointer">
                            <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
                        </li>
                        <li className="hover:text-white/90 cursor-pointer">
                            <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a>
                        </li>
                        <li className="hover:text-white/90 cursor-pointer">
                            <a href="#affiliation" onClick={(e) => handleNavClick(e, 'affiliation')}>Affiliations</a>
                        </li>
                        <li className="hover:text-white/90 cursor-pointer">
                            <a href="#team" onClick={(e) => handleNavClick(e, 'team')}>Team</a>
                        </li>
                        <li className="hover:text-white/90 cursor-pointer">
                            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
            <Outlet />
        </div>
    );
}
