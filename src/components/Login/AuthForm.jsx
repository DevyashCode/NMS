import api from "../../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../token";
import googleLogo from "./Images/icons8-google-logo-480.png"

const AuthForm = ({ route, method }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await api.post(route, { email, password });

            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/user');
                window.location.reload();
            }
            else {
                setSuccess("Registration Successful. Please Login!");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        }
        catch (error) {
            console.log(error);
            if (error.response) {
                if (error.response.status === 401) {
                    setError("Invalid Credentials");
                }
                else if (error.response.status === 400) {
                    setError("User Already Exists");
                }
                else {
                    setError("Something went wrong. Please Try again.");
                }
            }
            else if (error.request) {
                setError("Network error. Please check your internet connection.");
            }
            else {
                setError("Something went wrong. Please Try again.");
            }
        }
        finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8000/accounts/google/login";
    }

    return (
        <>
            <div className="w-[100%] h-[75%]">
                {loading && (
                    <div className="">
                        {error ? <span className="">{error}</span> : <div className=""></div>}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-center">
                        <h2 className="text-white font-bold text-2xl">{method === 'register' ? 'Register' : 'Login'}</h2>
                        {error && <div className="">{error}</div>}
                        {success && <div className="">{success}</div>}
                        <div className="h-12 w-full flex flex-col flex-grow gap-2">
                            <input
                                className="flex h-full w-full pl-3 rounded-md bg-darkInputElementBgColor text-lightInputElementTextColor"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="h-12 w-full flex flex-col flex-grow gap-2">
                            <input
                                className="flex h-full w-full pl-3 rounded-md bg-darkInputElementBgColor text-lightInputElementTextColor"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="h-12 w-full bg-purple-800 text-white rounded-md">{method === "register" ? "Register" : "Login"}</button>
                        <hr className="border-white" />
                        <button type="button" className="h-12 w-full bg-white rounded-md flex justify-center items-center" onClick={handleGoogleLogin}>
                            <img src={googleLogo} alt="google-icon" className="h-[55%] w-[10%] object-contain mr-2 font-bold"/>
                            {method === "register" ? "Register with Google" : "Login With Google" }
                        </button>
                        {method === "login" &&(
                            <p>Don,t have an account?
                            <span onClick={()=>navigate("/register")}>Register</span>
                            </p>
                        )}
                        {
                            method === 'register' && (
                                <p>Already have an account?
                                    <span onClick={()=>navigate("/login")}>Login</span>
                                </p>
                            )
                        }
                    </form>
                )}
            </div>
        </>
    )
}

export default AuthForm;