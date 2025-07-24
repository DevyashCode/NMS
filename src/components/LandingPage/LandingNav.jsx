import { Outlet } from "react-router-dom";

export default function LandingNav() {
    return (
        <div className="h-full w-full flex-col">
            <div className="fixed w-[80%] top-10 left-[10.1vw] right-0 min-h-17 bg-black/50 z-25 rounded-4xl border-2 border-white flex">
                <div className="w-[10%] h-[90%] border-1 border-white">
                    
                </div>
                <div></div>
            </div>
            <Outlet />
        </div>
    );
}
