import { addNetwork, NetworkAddLoading, AddedNetworkSelector, NetworkListError } from "../../Redux/Reducers/NetworkListReducer";
import { FormInput, FormSelect } from "../Form/formInput";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import PopupContainer from "../Popups/PopupContainer";
import SubmitConfirmation from "../Popups/SubmitConfirmation";
import ResetConfirmation from "../Popups/ResetConfirmation";
import Lottie from "lottie-react";
import Animation from "../Loading/PurpleLoader.json";
import ObjectDisplay from "../ObjectDisplay/ObjectDisplay";

export default function AddNetworkForm({
    macAddress, setMacAddress,
    ipAddress, setIpAddress,
    hostname, setHostname,
    location, setLocation,
    os, setOS,
    owner, setOwner,
    description, setDescription,
    type, setType
}) {
    const dispatch = useDispatch();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);
    const [showResetConfirmation, setShowResetConfirmation] = useState(false);
    const loading = useSelector(NetworkAddLoading);
    const addedNetwork = useSelector(AddedNetworkSelector);
    const error = useSelector(NetworkListError);
    const [showPopup, setShowPopup] = useState(false);

    const [formErrors, setFormErrors] = useState({});

    // Validation helpers
    const isValidIPv4 = (val) => {
        const parts = val.trim().split(".");
        if (parts.length !== 4) return false;
        return parts.every(p => /^\d+$/.test(p) && Number(p) >= 0 && Number(p) <= 255);
    };

    const isValidMAC = (val) => {
        return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(val.trim());
    };

    const validateForm = () => {
        let errors = {};
        if (!macAddress) errors.mac_address = "MAC Address is required";
        else if (!isValidMAC(macAddress)) errors.mac_address = "Invalid MAC Address";

        if (!ipAddress) errors.ip_address = "IP Address is required";
        else if (!isValidIPv4(ipAddress)) errors.ip_address = "Invalid IP Address";

        if (!hostname) errors.hostname = "Hostname is required";
        if (!location) errors.location = "Location is required";
        if (!os) errors.os = "OS is required";
        if (!owner) errors.owner_name = "Owner Name is required";
        if (!description) errors.description = "Description is required";
        if (!type) errors.type = "Type is required";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setShowConfirmation(true);
        setShowSubmitConfirmation(true);
    };

    const handleSubmitConfirmation = () => {
        setShowSubmitConfirmation(false);
        dispatch(addNetwork({
            "mac_address": macAddress,
            "ip_address": ipAddress,
            "hostname": hostname,
            "os": os,
            "location": location,
            "owner_name": owner,
            "description": description,
            "type": type
        }));
        setShowConfirmation(false);
        setShowPopup(true)
    };

    const handleButtonClick = () => {
        setShowPopup(false);
        handleReset();
    }

    const handleReset = () => {
        setMacAddress("");
        setIpAddress("");
        setHostname("");
        setLocation("");
        setOS("");
        setOwner("");
        setDescription("");
        setType("");
        setFormErrors({});
    };

    const handleResetClick = () => {
        setShowConfirmation(true);
        setShowResetConfirmation(true);
    }

    const formItems = [
        { name: "Mac Address", key: "mac_address", placeholder: "Enter MAC Address", value: macAddress, method: setMacAddress },
        { name: "IP Address", key: "ip_address", placeholder: "Enter IP Address", value: ipAddress, method: setIpAddress },
        { name: "Hostname", key: "hostname", placeholder: "Enter Host Name", value: hostname, method: setHostname },
        { name: "Location", key: "location", placeholder: "Enter Location", value: location, method: setLocation },
        { name: "OS", key: "os", placeholder: "Enter OS", value: os, method: setOS },
        { name: "Owner Name", placeholder: "Enter Owner Name", key: "owner_name", value: owner, method: setOwner },
        { name: "Description", placeholder: "Enter Description", key: "description", value: description, method: setDescription },
    ];

    return (
        <>
            <div className="w-full lg:mt-5 mb-12 flex flex-col bg-lightComponentBackground rounded-2xl shadow-md px-9 pt-5 dark:bg-darkComponentBackground">
                <div className="h-12 flex items-center">
                    <h1 className="text-lg text-lightHeaderText">Network Registration</h1>
                </div>

                <form className="flex flex-wrap gap-3" onSubmit={handleSubmit}>
                    {formItems.map((element, index) => (
                        <div key={index} className="w-[49%]">
                            <FormInput
                                inptLabel={element.name}
                                name={element.key}
                                placeholder={element.placeholder}
                                val={element.value}
                                handleChange={element.method}
                                disabled={false}
                            />
                            {formErrors[element.key] && (
                                <p className="text-red-500 text-xs mt-1">{formErrors[element.key]}</p>
                            )}
                        </div>
                    ))}

                    <div className="w-[49%] min-w-60">
                        <FormSelect
                            inptLabel={"Type"}
                            name="type"
                            options={["Wifi Router", "Switch", "Server", "Other"]}
                            val={type}
                            handleChange={setType}
                        />
                        {formErrors.type && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.type}</p>
                        )}
                    </div>

                    <div className="h-20 w-[49%] min-w-60 flex flex-grow gap-2">
                        <button type="submit" className="h-9 w-24 bg-lightButton mt-3 rounded-md text-white max-h-[34px]">Submit</button>
                        <button type="reset" className="h-9 w-24 bg-[#F8FAFC] dark:bg-[#262C36] text-[#6F7482] mt-3 rounded-md border-1 border-[#6F7482] max-h-[34px]" onClick={handleResetClick}>Reset</button>
                    </div>
                </form>
            </div>

            {showConfirmation && (
                <PopupContainer>
                    {showSubmitConfirmation && (
                        <SubmitConfirmation
                            setShowConfirmation={setShowConfirmation}
                            handleSubmitConfirmation={handleSubmitConfirmation}
                        />
                    )}

                    {showResetConfirmation && (
                        <ResetConfirmation 
                            setShowConfirmation={setShowConfirmation}
                            setShowResetConfirmation={setShowResetConfirmation}
                            handleResetConfirmation={handleReset}
                        />
                    )}
                </PopupContainer>
            )}

            {/* Loading and Confirmation animation */}
            {showPopup && (
                <PopupContainer
                    className={`justify-center items-center ${loading ? "w-110 h-60" : "w-150 h-90"}`}
                >
                    {loading && (
                        <div className="w-50 h-50">
                            <Lottie animationData={Animation} />
                        </div>
                    )}

                    {!loading && (
                        <div className="h-full w-full flex flex-col gap-2">
                            <div className="h-12 flex items-center text-lg text-lightHeaderText justify-between w-full">
                                <h1>IP : {addedNetwork.ip_address}</h1>
                                <div className={(addedNetwork ? "border-green-500 text-green-500 bg-green-200/30 dark:bg-green-200/10" : "border-red-400 text-red-500 bg-red-200/30 dark:bg-orange-200/10") + " h-[60%] rounded-lg border-2 text-sm flex justify-center items-center px-3"}>
                                    {addedNetwork ? "Network Added Successfully" : "Some Error Occured"}
                                </div>
                            </div>

                            <div className="h-[70%] w-full p-8 rounded-xl bg-lightInputElementBgColor text-gray-500 dark:bg-darkInputElementBgColor">
                                {addedNetwork ? (
                                    <div className="h-full w-full overflow-auto scrollbar-hide">
                                        <ObjectDisplay object={addedNetwork} />
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ObjectDisplay object={error} />
                                    </div>
                                )}
                            </div>

                            <div className="mt-3 w-full flex justify-between">
                                <div></div>
                                <div className="flex gap-2">
                                    <button className={"h-8 w-25 rounded-sm text-white max-h-[34px] flex justify-center items-center " + (addedNetwork ? "bg-lightButton" : "bg-red-600")}
                                        onClick={() => { handleButtonClick() }}
                                    >
                                        {addedNetwork ? "Done" : "Close"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </PopupContainer >
            )
            }
        </>
    );
}
