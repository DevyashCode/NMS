import { NetworkListSelector, addNetwork,NetworkScannedDataSelector } from "../../Redux/Reducers/NetworkListReducer";
import { FormInput, FormSelect } from "../Form/formInput";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import PopupContainer from "../Popups/PopupContainer";
import SubmitConfirmation from "../Popups/SubmitConfirmation";

export default function AddNetworkForm() {
    const dispatch = useDispatch();
    const scannedData = useSelector(NetworkScannedDataSelector);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);

    const [macAddress, setMacAddress] = useState("");
    const [ipAddress, setIpAddress] = useState("");
    const [hostname, setHostname] = useState("");
    const [location, setLocation] = useState("");
    const [os, setOS] = useState("");
    const [owner, setOwner] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");

    useEffect(()=>{
        setMacAddress(scannedData.mac);
        setIpAddress(scannedData.ip);
        setHostname(scannedData.hostname);
        setOS(scannedData.os);
    },[scannedData])

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
        setShowSubmitConfirmation(true);
    }

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
    }

    // const data = useSelector(NetworkListSelector);
    // const existingNetwork = data.find(network => network.ipAddress === ip);
    const formItems = [
        // { inptLabel: "IP Address", placeholder: "Enter IP Address", name: "ipAddress", val: existingNetwork && existingNetwork.ipAddress },
        // { inptLabel: "Host Name", placeholder: "Enter Host Name", name: "hostName", val: existingNetwork && existingNetwork.hostName },
        // { inptLabel: "MAC Address", placeholder: "Enter MAC Address", name: "macAddress", val: existingNetwork && existingNetwork.macAddress },
        // { inptLabel: "OS Name", placeholder: "Enter OS", name: "os", val: existingNetwork && existingNetwork.os },
        // { inptLabel: "Location", placeholder: "Enter Location", name: "location", val: existingNetwork && existingNetwork.location },
        // { inptLabel: "Owner Name", placeholder: "Enter Onwner Name", name: "owner", val: existingNetwork && existingNetwork.owner },
        // { inptLabel: "Description", placeholder: "Enter Description", name: "description", val: existingNetwork && existingNetwork.description },
        { "name": "Mac Address", "key": "mac_address", placeholder: "Enter MAC Address", "value": macAddress, "method": setMacAddress },
        { "name": "IP Address", "key": "ip_address", placeholder: "Enter IP Address", "value": ipAddress, "method": setIpAddress },
        { "name": "Hostname", "key": "hostname", placeholder: "Enter Host Name", "value": hostname, "method": setHostname },
        { "name": "Location", "key": "location", placeholder: "Enter Location", "value": location, "method": setLocation },
        { "name": "OS", "key": "os", placeholder: "Enter OS", "value": os, "method": setOS },
        { "name": "Owner Name", placeholder: "Enter Onwner Name", "key": "owner_name", "value": owner, "method": setOwner },
        { "name": "Description", placeholder: "Enter Description", "key": "description", "value": description, "method": setDescription },

    ];
    return (
        <>
            <div className="w-full lg:mt-5 mb-12 flex flex-col bg-lightComponentBackground rounded-2xl shadow-md px-9 py-4 dark:bg-darkComponentBackground">
                {/* Header */}
                <div className="h-12 flex items-center">
                    <h1 className="text-lg text-lightHeaderText">Network Registration</h1>
                </div>

                {/* Form */}
                <form className="flex flex-wrap gap-3" onSubmit={(e) => { handleSubmit(e) }}>
                    {formItems.map((element, index) => {
                        return (
                            <FormInput inptLabel={element.name} name={element.key} placeholder={element.placeholder} val={element.value} key={index} handleChange={element["method"]} disabled={false} />
                            // <FormInput key={index} inptLabel={item.inptLabel} placeholder={item.placeholder} name={item.name} val={item.val} />
                        )
                    })}
                    <FormSelect inptLabel={"Type"} name="type" options={["Wifi Router", "Switch", "Server", "Other"]} val={type} handleChange={setType} />
                    {/* <FormSelect inptLabel="Type" name="type" options={["wifi router", "server", "switch", "other"]} val={`${existingNetwork && existingNetwork.type}`} /> */}
                    <div className="h-20 w-[49%] min-w-60 flex flex-grow gap-2">
                        <button type="submit" className="h-9 w-24 bg-lightButton mt-3 rounded-md text-white max-h-[34px]">Submit</button>
                        <button type="reset" className="h-9 w-24 bg-[#F8FAFC] dark:bg-[#262C36] text-[#6F7482] mt-3 rounded-md border-1 border-[#6F7482] max-h-[34px]" onClick={()=>{handleReset()}}>Reset</button>
                    </div>
                </form>
            </div>

            {
                showConfirmation &&
                <PopupContainer>
                    {
                        showSubmitConfirmation &&
                        <SubmitConfirmation setShowConfirmation={setShowConfirmation} handleSubmitConfirmation={handleSubmitConfirmation} />
                    }
                </PopupContainer>
            }

        </>
    )
}