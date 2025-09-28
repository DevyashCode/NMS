import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { GOOGLE_ACCESS_TOKEN } from "../../token";
import mitslogo from "../../assets/mits-logo.png";
import Lottie from "lottie-react";
import Animation from "../Loading/PurpleLoader.json"

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profile, setProfile] = useState("");
  

  useEffect(() => {
    console.log("useEffect called!")
    const queryParams = new URLSearchParams(location.search);
    console.log(queryParams);
    const email = queryParams.get("email");
    const firstName = queryParams.get("first_name");
    const lastName = queryParams.get("last_name");
    const profileImage = queryParams.get("profile_image");
    if (email) setEmail(email);
    if (firstName) setFirstName(firstName);
    if (lastName) setLastName(lastName);
    if (profileImage) setProfile(profileImage);
  }, [])

  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/register/", {
        email,
        first_name: firstName,
        last_name: lastName,
        profile_image: profile,
        phone_number: phone,
        department,
        password
      });

      if (response.status === 201) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      if (error.response) {
        console.error("Error registering user:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const formFields = [
    {
      inptLabel: "First Name",
      placeholder: "First Name",
      name: "firstName",
      type: "text",
      val: firstName,
      handleChange: setFirstName,
      disabled: true
    },
    {
      inptLabel: "Last Name",
      placeholder: "Last Name",
      name: "lastName",
      type: "text",
      val: lastName,
      handleChange: setLastName,
      disabled: true
    },
    {
      inptLabel: "Email",
      placeholder: "Email",
      name: "email",
      type: "email",
      val: email,
      handleChange: setEmail,
      disabled: true
    },
    {
      inptLabel: "Phone",
      placeholder: "Phone number",
      name: "phone",
      type: "tel",
      val: phone,
      handleChange: setPhone,
      disabled: false
    },
    {
      inptLabel: "Password",
      placeholder: "Password",
      name: "password",
      type: "password",
      val: password,
      handleChange: setPassword,
      disabled: false
    }
  ];

  const options = [
    "AI(Artificial Intelligence)",
    "Artificial Intelligence and Data Science(AIDS)",
    "Artificial Intelligence and Machine Learning(AIML)",
    "Chemical Engineering",
    "Civil Engineering",
    "Computer Science and Engineering(CSE)",
    "CSBS(Computer Science and Business Systems)",
    "CSD(Computer Science and Design)",
    "CST(Computer Science and Technology)",
    "Electrical Engineering",
    "Electronics Engineering",
    "Electronics and Communication Engineering(ECE)",
    "ET / ETE(Electronics and Telecommunication)",
    "EEIOT",
    "EACE(Electrical and Computer Engineering)",
    "IT(AIR) / IT - AIR(Artificial Intelligence & Robotics)",
    "IT(Information Technology)",
    "ITIOT",
    "Mechanical Engineering",
    "MCA(Master of Computer Applications)",
    "MAC(Mathematics and Computing)"
  ];

  return (
    <>
      <div className="h-full w-full bg-black flex flex-col justify-between items-center">
        <div className="w-[100%] h-full flex flex-col xl:flex-row xl:justify-center xl:items-center bg-black overflow-hidden">
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
              <div className="w-full flex h-35 md:h-[35%] mb-5 xl:mb-0 xl:h-full xl:w-[60%]">
                <img src="https://raw.githubusercontent.com/rahulrawat95r/XamDruImg/main/loginbanner.jpg" alt="login-image" className="h-full w-full" />
              </div>
              <div className="w-full xl:w-[40%] h-[75%] md:h-[60%] lg:h-[70%] xl:h-full p-4 md:p-10 xl:pt-20 flex flex-col items-center gap-3 md:gap-6 overflow-auto scrollbar-hide ">
                <div className="w-full -mt-36 md:-mt-18 xl:-mt-10 flex justify-center items-center xl:w-full">
                  <div className="h-24 w-24 md:h-28 md:w-28 bg-black/60 flex items-center justify-center rounded-full">
                    <img src={mitslogo} alt="mits-logo" className="h-22 w-22 md:h-28 md:w-28" />
                  </div>
                  <div className="h-full text-white flex flex-col justify-center ml-4">
                    <h2 className="font-bold text-2xl">Welcome to <br /> Network Management System</h2>
                    <h2 className="tracking-wide text-white/80">Madhav Institute of Technology and Science</h2>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-center w-full px-6 md:px-40 lg:px-80 xl:w-full xl:px-10">
                  <h2 className="text-white font-semibold text-xl xl:mb-5 xl:text-2xl">Register</h2>
                  <div className="w-full flex justify-center items-center xl:w-full">
                    <div className="h-24 w-24 md:h-28 md:w-28 bg-black/60 flex items-center justify-center rounded-full border-1 border-white/20 overflow-hidden">
                      <img src={profile} alt="profile" className="h-22 w-22 md:h-28 md:w-28" />
                    </div>
                  </div>
                  {error && <div className="text-red-500">{error}</div>}
                  {success && <div className="text-green-500">{success}</div>}
                  {formFields.map((field, index) => {
                    return (
                      <div key={index} className="h-12 w-full flex flex-col gap-2">
                        <input
                          type={field.type}
                          className="flex h-full w-full pl-3 rounded-md bg-darkInputElementBgColor text-lightInputElementTextColor"
                          placeholder={field.placeholder}
                          name={field.name}
                          value={field.val}
                          onChange={(e) => field.handleChange(e.target.value)}
                          disabled={field.disabled}
                          required
                        />
                      </div>
                    )
                  })}
                  <div className="h-12 w-full flex flex-col gap-2">
                    <select
                      name="department"
                      value={department}
                      onChange={(e) => {
                        setDepartment(e.target.value);
                      }}
                      className="flex h-full w-full pl-3 rounded-md bg-darkInputElementBgColor text-lightInputElementTextColor"
                    >
                      <option value="" hidden >
                        Select Department
                      </option>
                      {options.map((optn, i) => (
                        <option key={i} value={optn.toLowerCase()}>
                          {optn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="h-12 w-full bg-purple-800 text-white rounded-md"
                  >
                    Continue
                  </button>
                  {/* <div className="w-full flex">
                <div className="flex flex-grow"></div>
                <h1 className="text-[#007AFF]">Forget Password ?</h1>
              </div> */}
                </form>
              </div>
            </>
          )}

        </div>
        <div className="border-t border-white/30 py-4 sm:py-6 flex items-center justify-center xl:w-full xl:h-14">
          <h3 className="text-white/80 text-xs sm:text-sm lg:text-base text-center leading-relaxed">
            © 2025 NMS MITS : Software Development Club
          </h3>
        </div>
      </div>
    </>
  );
}

export default Register;
