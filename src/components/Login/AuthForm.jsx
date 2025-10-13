import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../Redux/Reducers/AuthReducer";
import googleLogo from "./Images/icons8-google-logo-480.png";
import { IsAuthorisedSelector } from "../../Redux/Reducers/AuthReducer";
import Lottie from "lottie-react";
import Animation from "../Loading/PurpleLoader.json"
import mitslogo from "../../assets/mits-logo.png";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthorized = useSelector(IsAuthorisedSelector);

  useEffect(() => {
    if (isAuthorized) {
      navigate("/user", { replace: true });
    }
  // }, [isAuthorized, navigate]);
  }, [isAuthorized]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const resultAction = await dispatch(
        login({ email, password })
      );

      if (login.fulfilled.match(resultAction)) {
        setSuccess("Login successful!");
      } else {
        throw new Error(resultAction.payload || "Login failed");
      }
    } catch (err) {
      console.log(err.message);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    window.location.href = "http://localhost:8000/accounts/google/login/";
  };

  return (
    <div className="w-[100%] h-full xl:flex xl:justify-center xl:items-center">
      {loading && (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <div className="w-50 h-50 flex flex-col justify-center items-center -mt-8">
            <Lottie animationData={Animation} />
          </div>
        </div>
      )}

      {!loading && (
        <>
          {/* <div className="w-full flex h-[30%] flex-col justify-center items-center border-2 border-white rounded-2xl mt-10 mb-5 bg-white/20"> */}
          <div className="w-full flex h-[20%] md:h-[35%] mb-5 xl:mb-0 xl:h-full xl:w-[60%]">
            <img src="https://raw.githubusercontent.com/rahulrawat95r/XamDruImg/main/loginbanner.jpg" alt="login-image" className="h-full w-full" />
          </div>
          <div className="w-full xl:w-[40%] h-[75%] md:h-[60%] lg:h-[70%] xl:h-[80%] p-4 md:p-10 flex flex-col items-center gap-3 md:gap-6">
            <div className="w-full -mt-15 md:-mt-18 xl:-mt-6 flex justify-center items-center xl:w-full">
              <div className="h-24 w-24 md:h-28 md:w-28 bg-black/60 flex items-center justify-center rounded-full">
                <img src={mitslogo} alt="mits-logo" className="h-22 w-22 md:h-28 md:w-28" />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-center w-full px-6 md:px-40 lg:px-80 xl:w-full xl:px-10 mt-2">
              <h2 className="text-white font-semibold text-xl">Login</h2>
              {error && <div className="text-red-500">{error}</div>}
              {success && <div className="text-green-500">{success}</div>}

              {/* Email input */}
              <div className="h-12 w-full flex flex-col gap-2">
                <input
                  type="email"
                  className="flex h-full w-full pl-3 rounded-md bg-darkInputElementBgColor text-lightInputElementTextColor"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password input */}
              <div className="h-12 w-full flex flex-col gap-2">
                <input
                  type="password"
                  className="flex h-full w-full pl-3 rounded-md bg-darkInputElementBgColor text-lightInputElementTextColor"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="h-12 w-full bg-purple-800 text-white rounded-md"
              >
                Login
              </button>
              <div className="w-full flex">
                <div className="flex flex-grow"></div>
                <h1 className="text-[#007AFF]">Forget Password ?</h1>
              </div>

              <hr className="border-white" />

              {/* Google Login */}
              <button
                type="button"
                className="h-12 w-full bg-white rounded-md flex justify-center items-center"
                onClick={handleGoogleLogin}
              >
                <img
                  src={googleLogo}
                  alt="google-icon"
                  className="h-[55%] w-[10%] object-contain mr-2 font-bold"
                />
                Continue With Google
              </button>
            </form>
          </div>
        </>
      )}

    </div>
  );
};

export default AuthForm;
