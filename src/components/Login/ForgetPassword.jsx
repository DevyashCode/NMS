import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../Redux/Reducers/AuthReducer";
import googleLogo from "./Images/icons8-google-logo-480.png";
import { IsAuthorisedSelector } from "../../Redux/Reducers/AuthReducer";
import Lottie from "lottie-react";
import Animation from "../Loading/PurpleLoader.json"
import mitslogo from "../../assets/mits-logo.png";
import { NavLink } from "react-router-dom";
import LoginPageFooter from "./LoginPageFooter";

const ForgetPassword = () => {

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <div className="h-full w-full bg-black flex flex-col justify-between items-center">
            <div className="w-[100%] h-full xl:flex xl:justify-center xl:items-center bg-black">
                {/* <div className="w-full flex h-[30%] flex-col justify-center items-center border-2 border-white rounded-2xl mt-10 mb-5 bg-white/20"> */}
                <div className="w-full flex h-[20%] md:h-[35%] mb-5 xl:mb-0 xl:h-full xl:w-[60%]">
                    <img src="https://raw.githubusercontent.com/rahulrawat95r/XamDruImg/main/loginbanner.jpg" alt="login-image" className="h-full w-full" />
                </div>
                <div className="w-full xl:w-[40%] h-[75%] md:h-[60%] lg:h-[70%] xl:h-[80%] p-4 md:p-10 flex flex-col items-center justify-center gap-3 md:gap-6">
                    <div className="w-full -mt-15 md:-mt-18 xl:-mt-6 flex justify-center items-center xl:w-full">
                        <div className="h-24 w-24 md:h-28 md:w-28 bg-black/60 flex items-center justify-center rounded-full">
                            <img src={mitslogo} alt="mits-logo" className="h-22 w-22 md:h-28 md:w-28" />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-center w-full px-6 md:px-40 lg:px-80 xl:w-full xl:px-10">
                        <h2 className="text-white font-semibold text-xl">Reset Your Password</h2>

                        {/* Email input */}
                        <div className="h-12 w-full flex flex-col gap-2">
                            <input
                                type="email"
                                className="flex h-full w-full pl-3 rounded-md bg-darkInputElementBgColor text-lightInputElementTextColor"
                                placeholder="Enter your Email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="h-12 w-full bg-purple-800 text-white rounded-md"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
            <LoginPageFooter />
        </div>
    );
};

export default ForgetPassword;
