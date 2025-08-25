import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { GOOGLE_ACCESS_TOKEN } from "../../token";

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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-darkComponentBackground">
      <div className="h-full w-full flex items-center justify-center">
      </div>
      <div className="w-full h-16 text-white flex items-center justify-center bg-white/30 backdrop-blur-md border border-white/20 shadow-lg ">
        Copyright © 2025 MITS. All rights reserved | Designed by Devyash Rasela
      </div>
    </div>
  );
}

export default Register;
