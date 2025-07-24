import { Outlet } from "react-router-dom";
import mitsLogo from "../Navbar/Nav Icons/mits-logo.png"

export default function LandingNav() {
    return (
        <div className="h-full w-full flex-col">
            <div className="fixed w-[70%] h-[8%] top-10 left-[15vw] right-0 min-h-17 bg-black/50 z-25 rounded-[45px] border-2 border-white/30 flex px-10 justify-between">
                <img src={mitsLogo} className="w-[7%] h-full" />
                <div className="w-[50%] h-full">
                    <ul className="text-white/80 flex h-full w-full justify-around items-center text-lg">
                        <li className="hover:text-white/90">Home</li>
                        <li className="hover:text-white/90">About</li>
                        <li className="hover:text-white/90">Affiliations</li>
                        <li className="hover:text-white/90">Team</li>
                        <li className="hover:text-white/90">Contact</li>
                    </ul>
                </div>
            </div>
            <Outlet />
        </div>
    );
}
