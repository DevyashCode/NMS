import Header from "../SectionHeader/Header.jsx";
import profileImage from "./BigShoesAvatar.png";
import { FormInput, FormSelect } from "../Form/formInput";

export default function UserProfile() {
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const formItems = [
        { inptLabel: "First Name", placeholder: "First Name", name: "firstName"},
        { inptLabel: "Last Name", placeholder: "Last Name", name: "lastName"},
        { inptLabel: "Email", placeholder: "example@examile.com", name: "email"},
        { inptLabel: "Phone", placeholder: "9999999999", name: "phone"},
        { inptLabel: "Role", placeholder: "Admin", name: "role"},
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
                            <div className="text-2xl font-bold mt-5">0901XXXXXXXX</div>
                            <div className="text-3xl font-bold mt-1">Admin</div>
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
