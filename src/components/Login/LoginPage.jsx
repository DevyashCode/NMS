import { useEffect, useState } from "react";
import { CgCloseO } from "react-icons/cg";
import AuthForm from "./AuthForm";
import LoginPageFooter from "./LoginPageFooter";
import { logout } from "../../Redux/Reducers/AuthReducer";
import NMSLogo from "../../assets/NMS_Logo.jpg"

function LoginPage() {
    const route = '/api/token/';

    return (
        <div className="h-full w-full bg-black flex flex-col justify-between items-center">
            <div className="h-[90%] w-full flex items-center justify-center flex-grow">
                <div className="h-full w-full flex">
                    <AuthForm route={route} />
                </div>
            </div>
            <LoginPageFooter />
        </div>
    );
}

export default LoginPage;
