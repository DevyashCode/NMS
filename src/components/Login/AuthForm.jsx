import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../Redux/Reducers/AuthReducer";
import googleLogo from "./Images/icons8-google-logo-480.png";
import { IsAuthorisedSelector } from "../../Redux/Reducers/AuthReducer";

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
  }, [isAuthorized, navigate]);

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
        // navigate("/user", { replace: true });
      } else {
        throw new Error(resultAction.payload || "Login failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    window.location.href = "http://localhost:8000/accounts/google/login/";
    // const res = await fetch("http://localhost:8000/auth/google/url/");
    // const data = await res.json();
    // console.log("Google Auth URL:", data.auth_url);
    // window.location.href = data.auth_url;
  };

  return (
    <div className="w-[100%] h-[75%]">
      {loading && (
        <div className="text-white">Processing...</div>
      )}

      {!loading && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-center">
          <h2 className="text-white font-bold text-2xl">Login</h2>
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
            Login With Google
          </button>
        </form>
      )}
    </div>
  );
};

export default AuthForm;
