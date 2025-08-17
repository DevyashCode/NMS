import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormInput, FormSelect } from "../Form/formInput";
import { userListLoading, userListError, updateUser, userSelector } from "../../Redux/Reducers/userReducer";
import ConfirmationContainer from "../Popups/ConfirmationContainer";
import CancelConfirmation from "../Popups/CancelConfirmation";
import SubmitConfirmation from "../Popups/SubmitConfirmation";


function EditUserForm({ userName, handlePopupClose }) {

    const dispatch = useDispatch();
    const data = useSelector(userSelector);
    const [userInfo, setInfo] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [role, setRole] = useState("");

    const handleReset = (user) => {
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setEmail(user.email);
        setDepartment(user.department);
        setMobileNo(user.mobile_no);
        setRole(user.role);
    }

    useEffect(() => {
        if (!data || data.length === 0) return;

        const index = data.findIndex((obj) => obj["username"] === userName);
        if (index !== -1) {
            const user = data[index];
            handleReset(user);
            setInfo(user);
        } else {
            setInfo(null);
        }
    }, [userName, data]);

    const inputFields = [
        { "name": "First Name", "key": "first_name", "value": firstName, "method": setFirstName, disabled: false },
        { "name": "Last Name", "key": "last_name", "value": lastName, "method": setLastName, disabled: false },
        { "name": "Email", "key": "email", "value": emailId, "method": setEmail, disabled: true },
        { "name": "Phone", "key": "mobile_no", "value": mobileNo, "method": setMobileNo, disabled: false },
        { "name": "Department", "key": "department", "value": department, "method": setDepartment, disabled: false },
    ];

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
    const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowConfirmation(true);
        setShowSubmitConfirmation(true);
    }

    const handleSubmitConfirmation = () => {
        setShowSubmitConfirmation(false);
        dispatch(updateUser({
            userName,
            userData: {
                first_name: firstName,
                last_name: lastName,
                email: emailId,
                mobile_no: mobileNo,
                department: department,
                role: role
            }
        }));
        setShowConfirmation(false);
        handlePopupClose();
    }

    const handleCancel = () => {
        setShowConfirmation(true);
        setShowCancelConfirmation(true);
    }

    return (
        <>
            <div className="h-full w-full p-4">
                <form onSubmit={handleSubmit} className="flex flex-wrap gap-3">
                    {inputFields.map((element, index) =>
                        <FormInput inptLabel={element.name} name={element.key} val={element.value} key={index} handleChange={element["method"]} className={"w-[49%]"} disabled={element.disabled} />
                    )}
                    <FormSelect inptLabel={"Role"} name="role" options={["Admin", "Technician", "User"]} val={role.toLowerCase()} className={"w-[49%]"} handleChange={setRole} />
                    <div className="flex gap-2 mt-4 text-white w-full">
                        <button type="submit" className="h-8 w-20 bg-lightButton rounded-sm max-h-[34px]">Submit</button>
                        <button type="reset" className="h-8 w-20 border-2 border-gray-400 text-gray-400 rounded-sm" onClick={() => { handleReset(userInfo) }}>Reset</button>
                        <button className="h-8 w-20 bg-red-500 rounded-sm" onClick={() => { handleCancel() }}>Cancel</button>
                    </div>
                </form>
            </div>

            {/* Cancel Confirmation Popup */}
            {
                showConfirmation &&
                <ConfirmationContainer>
                    {showCancelConfirmation ?
                        <CancelConfirmation setShowConfirmation={setShowConfirmation} setShowCancelConfirmation={setShowCancelConfirmation} handlePopupClose={handlePopupClose} /> :
                        showSubmitConfirmation ?
                            <SubmitConfirmation setShowConfirmation={setShowConfirmation} setShowSubmitConfirmation={setShowSubmitConfirmation} handleSubmitConfirmation={handleSubmitConfirmation} /> :
                            <></>
                    }
                </ConfirmationContainer>
            }

        </>
    );
}

export default EditUserForm;