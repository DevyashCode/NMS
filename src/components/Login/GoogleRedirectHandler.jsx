import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GOOGLE_ACCESS_TOKEN } from "../../token";
import { setAuthorized, setUser } from "../../Redux/Reducers/AuthReducer";
import { IsAuthorisedSelector, UserSelector } from "../../Redux/Reducers/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import Animation from "../Loading/PurpleLoader.json";

function RedirectGoogleAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthorized = useSelector(IsAuthorisedSelector);
    const user = useSelector(UserSelector);

    useEffect(() => {
        console.log("RedirectHandler mounted Successfully!");

        const queryParams = new URLSearchParams(window.location.search);
        const accessToken = queryParams.get('access_token');
        console.log("QueryParams", window.location.search);

        if (accessToken) {
            console.log("AccessToken found:", accessToken);
            localStorage.setItem(GOOGLE_ACCESS_TOKEN, accessToken);

            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            axios.get('http://127.0.0.1:8000/api/auth/user/')
                .then(response => {
                    console.log('User Data:', response.data);
                    dispatch(setAuthorized(true));
                    dispatch(setUser(response.data));
                })
                .catch(error => {
                    console.error('Error verfiying token:', error.response ? error.response.data : error.message);
                    navigate('/login', { replace: true });
                })
        }
        else {
            console.log('No token found in URL');
            navigate('/login', { replace: true });
        }
    }, []);

    useEffect(() => {
        if (isAuthorized && user) {
            navigate('/user', { replace: true });
        }
    }, [isAuthorized, user, navigate]);

    return (
        <div className="bg-black flex justify-center items-center h-full w-full" >
            <div className="flex flex-col rounded-2xl shadow-md p-4 lg:px-8 pt-4 w-110 h-60 justify-center items-center">
                <div className="w-50 h-50 flex flex-col justify-center items-center -mt-8">
                    <Lottie animationData={Animation} />
                </div>
                <div className="w-full flex flex-col items-center mt-5">
                    <h1 className="text-white font-bold text-lg">Logging In...</h1>
                    {/* <p className="text-lg text-[#4F46E5] dark:text-[#8179FF]">Please wait while we ping the IP Address</p> */}
                </div>
            </div>
        </div>
    );
}

export default RedirectGoogleAuth