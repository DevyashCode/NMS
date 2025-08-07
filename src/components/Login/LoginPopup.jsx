import { useEffect, useRef, useState } from "react";
import { CgCloseO } from "react-icons/cg";
import AuthForm from "./AuthForm";

function LoginPopup({ handlePopupClose,initialMethod }) {
    const modalRef = useRef();
    const [method,setMethod] = useState(initialMethod);

    useEffect(()=>{
        setMethod(initialMethod);
    }),[initialMethod];

    const route = method === 'login' ? '/api/token/' : '/api/user/register';

    const closeRef = (e) => {
        if (modalRef.current === e.target) {
            handlePopupClose();
        }
    }

    return (
        <div ref={modalRef} className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50" onClick={closeRef}>
            <div className="h-[62%] lg:h-[65%] w-[90%] lg:w-[55%] flex flex-col bg-darkComponentBackground rounded-2xl shadow-md p-4 lg:px-8 pt-2 items-center">
                {/* Heading */}
                <div className="h-12 flex items-center text-lg text-lightHeaderText justify-between w-full">
                    <div></div>
                    <CgCloseO className="text-xl" onClick={() => { handlePopupClose() }} />
                </div>

                {/* Main */}
                <div className="h-[85%] w-[98%] flex items-center px-10 justify-between">
                    {/* Logo */}
                    <div className="h-[60%] w-[40%]"></div>
                    <div className="h-[80%] w-[55%] flex flex-col">
                        <AuthForm route={route} method={method}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPopup;