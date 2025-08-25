import { useEffect, useState } from "react";
import { CgCloseO } from "react-icons/cg";
import AuthForm from "./AuthForm";
import { logout } from "../../Redux/Reducers/AuthReducer";
import NMSLogo from "../../assets/NMS_Logo.jpg"

function LoginPage() {
    // const [method,setMethod] = useState(initialMethod);

    // useEffect(()=>{
    const route = '/api/token/';

    return (
        <div className="bg-black flex flex-col justify-between items-center h-full w-full" >
            <div className="h-full w-full flex items-center justify-center">
                <div className="h-[62%] lg:h-[65%] w-[90%] lg:w-[55%] flex bg-darkComponentBackground rounded-2xl shadow-md p-4 lg:px-8 items-center gap-10">
                    {/* <div className="h-[85%] w-[98%] flex items-center px-10 justify-between border-2 border-white"> */}
                    {/* Logo */}
                    <div className="h-[60%] w-[36%] rounded-2xl overflow-hidden">
                        <img src={NMSLogo} alt="NMS Logo" className="h-full w-full object-contain" />
                    </div>
                    <div className="h-full w-[55%] flex flex-col border-2 border-white">
                        <AuthForm route={route} />
                    </div>
                    {/* </div> */}
                </div>
            </div>
            <div className="w-full h-16 text-white flex items-center justify-center bg-white/30 backdrop-blur-md border border-white/20 shadow-lg ">
                Copyright © 2025 MITS. All rights reserved | Designed by Devyash Rasela
            </div>
        </div>
    );
}

export default LoginPage;