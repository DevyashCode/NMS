import Header from "../SectionHeader/Header.jsx";
import profileImage from "./BigShoesAvatar.png";
import { FormInput, FormSelect } from "../Form/formInput";
import { useState } from "react";
import { useSelector } from "react-redux";
import { UserSelector } from "../../Redux/Reducers/AuthReducer.jsx";
import { useEffect } from "react";

export default function UserProfile() {
    const user = useSelector(UserSelector);
    const [firstName, setFirstName] = useState(user ? user.first_name : "");
    const [lastName, setLastName] = useState(user ? user.last_name : "");
    const [email, setEmail] = useState(user ? user.email : "");
    const [phone, setPhone] = useState(user ? user.phone : "");
    const [role, setRole] = useState(user ? user.role : "");
    const [department, setDepartment] = useState(user ? user.department : "");

    useEffect(() => {
        console.log(user);
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const formItems = [
        { inptLabel: "First Name", placeholder: "First Name", name: "firstName",val:firstName, onChange:setFirstName },
        { inptLabel: "Last Name", placeholder: "Last Name", name: "lastName",val:lastName, onChange:setLastName },
        { inptLabel: "Email", placeholder: "example@examile.com", name: "email",val:email, onChange:setEmail },
        { inptLabel: "Phone", placeholder: "Phone Number", name: "phone",val:phone, onChange:setPhone },
        { inptLabel: "Role", placeholder: "Admin", name: "role",val:role, onChange:setRole },
    ];

    return (
        <>
            <div className="page-container">
                {/* Header */}
                <Header headerName="Profile" />

                {/* Profile */}
                <div className="profileContainer scrollbar-hide">
                    <div className="w-90 flex flex-col flex-grow items-center lg:py-10">
                        <div className="size-70 bg-[#FFB31F] rounded-full flex flex-col items-center dark:text-[#E3E3E3]">
                            <img src={profileImage} alt="Profile Image" className="rounded-full" />
                            <div className="text-2xl font-bold mt-5">{user ? user.first_name+" "+user.last_name:"user"}</div>
                            <div className="text-3xl font-bold mt-1">{user ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "role"}</div>
                        </div>
                    </div>

                    {/* Profile Data */}
                    <div className="w-[50%] min-w-70 flex-grow py-5 mt-15 lg:mt-0">
                        <form className="flex flex-wrap gap-3" onSubmit={(e) => { handleSubmit(e) }}>
                            {formItems.map((item, index) => {
                                return (
                                    <FormInput key={index} inptLabel={item.inptLabel} placeholder={item.placeholder} name={item.name} val={item.val} />
                                )
                            })}
                            <FormSelect inptLabel="Department" name="department" options={["Information Technology", "Computer Science & Engineering", "Electronics"]} />
                            <div className="h-20 w-[49%] min-w-60 flex flex-grow gap-2">
                                <button type="submit" className="h-9 w-24 bg-lightButton mt-3 rounded-md text-white max-h-[34px]">Submit</button>
                                <button type="reset" className="h-9 w-24 bg-[#F8FAFC] dark:bg-[#262C36] text-[#6F7482] mt-3 rounded-md border-1 border-[#6F7482] max-h-[34px]">Reset</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}
