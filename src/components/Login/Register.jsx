import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { GOOGLE_ACCESS_TOKEN } from "../../token";
import { FormInput, FormSelect } from "../Form/formInput";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const formFields = [
    {
      inptLabel: "Email",
      placeholder: "Enter your email",
      name:"email",
      type: "email",
      value: email,
      handleChange: (e) => setEmail(e.target.value),
    },    
    {
      inptLabel: "Phone",
      placeholder: "Enter your phone number",
      name:"phone",
      type: "tel",
      value: phone,
      handleChange: (e) => setPhone(e.target.value),
    },      
    {
      inptLabel: "Password",
      placeholder: "Enter your password",
      name:"password",
      type: "password",
      value: password,
      handleChange: (e) => setPassword(e.target.value),
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-darkComponentBackground">
      <div className="h-full w-full flex items-center justify-center border-2 border-white">
        <div className="h-full w-1/2 border-2 border-white"></div>
        <div className="h-full w-1/2 border-2 border-white flex items-center justify-center">
          <div className="bg-gray-400/50 w-[80%] h-[80%] rounded-2xl">
            <h1 className="text-white text-2xl font-bold h-20 w-full flex items-center justify-center">Register</h1>
            <form action="" className="px-20 flex flex-col gap-3" onSubmit={handleSubmit}>
              {formFields.map((field, index) => {
                return (
                  <FormInput
                    key={index}
                    {...field}
                  />
                );
              })}
              <FormSelect
                inptLabel="Department"
                name="department"
                options={["Computer Science", "Information Technology", "Mechanical"]}
                value={department}
                handleChange={(e) => setDepartment(e.target.value)}
              />
              <button type="submit" className="h-12 w-full bg-purple-600 rounded-xl font-bold text-white">Continue</button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full h-16 text-white flex items-center justify-center bg-white/30 backdrop-blur-md border border-white/20 shadow-lg ">
        Copyright © 2025 MITS. All rights reserved | Designed by Devyash Rasela
      </div>
    </div>
  );
}

export default Register;
