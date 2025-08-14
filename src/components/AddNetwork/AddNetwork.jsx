import axios from "axios";
import Header from "../SectionHeader/Header.jsx";
import AddNetworkForm from "./AddNetworkForm";
import SearchIpAddress from "./SearchIPAddress";
import { useState, useEffect } from "react";


export default function AddNetwork() {
    const [macAddress, setMacAddress] = useState("");
    const [ipAddress, setIpAddress] = useState("");
    const [hostname, setHostname] = useState("");
    const [location, setLocation] = useState("");
    const [os, setOS] = useState("");
    const [owner, setOwner] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");

    return (
        <>
            <div className="page-container scrollbar-hide">

                {/* Header */}
                <Header headerName="Add Network" />

                {/* IP search Bar */}
                <SearchIpAddress setMacAddress={setMacAddress} setIpAddress={setIpAddress} setHostname={setHostname} setOS={setOS} />

                {/* Add Network Form */}
                <AddNetworkForm
                    macAddress={macAddress}
                    setMacAddress={setMacAddress}
                    ipAddress={ipAddress}
                    setIpAddress={setIpAddress}
                    hostname={hostname}
                    setHostname={setHostname}
                    location={location}
                    setLocation={setLocation}
                    os={os}
                    setOS={setOS}
                    owner={owner}
                    setOwner={setOwner}
                    description={description}
                    setDescription={setDescription}
                    type={type}
                    setType={setType}
                />

            </div>
        </>
    )
}

