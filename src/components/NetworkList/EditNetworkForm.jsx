import { useEffect, useState } from "react";
import { NetworkListSelector } from "../../Redux/Reducers/NetworkListReducer";
import { useSelector, useDispatch } from "react-redux";
import { FormInput, FormSelect } from "../Form/formInput";
import { NetworkListLoading, NetworkListError, updateNetwork } from "../../Redux/Reducers/NetworkListReducer";
import ConfirmationContainer from "../Popups/ConfirmationContainer";
import CancelConfirmation from "../Popups/CancelConfirmation";
import SubmitConfirmation from "../Popups/SubmitConfirmation";


function EditNetworkForm({ mac, handlePopupClose }) {

    const dispatch = useDispatch();
    const data = useSelector(NetworkListSelector);
    const [networkInfo, setInfo] = useState("");

    const [macAddress, setMacAddress] = useState("");
    const [ipAddress, setIpAddress] = useState("");
    const [hostname, setHostname] = useState("");
    const [location, setLocation] = useState("");
    const [os, setOS] = useState("");
    const [owner, setOwner] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");

    const handleReset = (network) => {
        setMacAddress(network.mac_address);
        setIpAddress(network.ip_address);
        setHostname(network.hostname);
        setLocation(network.location);
        setOS(network.os);
        setOwner(network.owner_name);
        setDescription(network.description);
        setType(network.type);
    }

    useEffect(() => {
        if (!data || data.length === 0) return;

        const index = data.findIndex((obj) => obj["mac_address"] === mac);
        if (index !== -1) {
            const network = data[index];
            handleReset(network);
            setInfo(network);
        } else {
            setInfo(null);
        }
    }, [mac, data]);

    const inputFields = [
        { "name": "Mac Address", "key": "mac_address", "value": macAddress, "method": setMacAddress },
        { "name": "IP Address", "key": "ip_address", "value": ipAddress, "method": setIpAddress },
        { "name": "Hostname", "key": "hostname", "value": hostname, "method": setHostname },
        { "name": "Location", "key": "location", "value": location, "method": setLocation },
        { "name": "OS", "key": "os", "value": os, "method": setOS },
        { "name": "Owner Name", "key": "owner_name", "value": owner, "method": setOwner },
        { "name": "Description", "key": "description", "value": description, "method": setDescription },
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
        dispatch(updateNetwork({
            mac: macAddress,
            networkData: {
                mac_address: macAddress,
                ip_address: ipAddress,
                hostname: hostname,
                location: location,
                os: os,
                owner_name: owner,
                description: description,
                type: type
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
                        <FormInput inptLabel={element.name} name={element.key} val={element.value} key={index} handleChange={element["method"]} className={"w-[49%]"} disabled={false} />
                    )}
                    <FormSelect inptLabel={"Type"} name="type" options={["Wifi Router", "Switch", "Server", "Other"]} val={type} className={"w-[49%]"} handleChange={setType} />
                    <div className="flex gap-2 mt-4 text-white w-full">
                        <button type="submit" className="h-8 w-20 bg-lightButton rounded-sm max-h-[34px]">Submit</button>
                        <button type="reset" className="h-8 w-20 border-2 border-gray-400 text-gray-400 rounded-sm" onClick={() => { handleReset(networkInfo) }}>Reset</button>
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

export default EditNetworkForm;