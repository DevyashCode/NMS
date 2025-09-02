import { useEffect, useState } from "react";
import { CgCloseO } from "react-icons/cg";
import AuthForm from "./AuthForm";
import { logout } from "../../Redux/Reducers/AuthReducer";
import NMSLogo from "../../assets/NMS_Logo.jpg"

function LoginPage() {
    const route = '/api/token/';

    return (
        <div className="h-full w-full bg-black flex flex-col justify-between items-center">
            <div className="h-[90%] w-full flex items-center justify-center">
                <div className="h-full w-full flex justify-center">
                    <AuthForm route={route} />
                </div>
            </div>
            <div className="border-t border-white/30 py-4 sm:py-6 flex items-center justify-center">
            {/* <div className="py-4 sm:py-6 flex items-center justify-center border-5 border-red-800"> */}
                <h3 className="text-white/80 text-xs sm:text-sm lg:text-base text-center leading-relaxed">
                    © 2025 NMS MITS : Software Development Club
                </h3>
            </div>
        </div>
    );
}

export default LoginPage;

//                <div className="h-[62%] lg:h-[65%] w-[90%] lg:w-[55%] flex bg-darkComponentBackground rounded-2xl shadow-md p-4 lg:px-8 items-center gap-10">
//                    {/* Logo */}
//                    <div className="h-[60%] w-[36%] rounded-2xl overflow-hidden">
//                        <img src={NMSLogo} alt="NMS Logo" className="h-full w-full object-contain" />
//                    </div>
//                    <div className="h-full w-[55%] flex flex-col border-2 border-white">
//                       <AuthForm route={route} />
//                    </div>
//                    {/* </div> */}
//                </div>