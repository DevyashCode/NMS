import Header from "../SectionHeader/Header.jsx";
import AddNetworkForm from "./AddNetworkForm";
import SearchIpAddress from "./SearchIPAddress";
import { useState } from "react";


export default function AddNetwork() {
    const [ip,setIp] = useState("");
    return (
        <>
            <div className="page-container">

                {/* Header */}
                <Header headerName="Add Network" />

                {/* IP search Bar */}
                <SearchIpAddress setIp={setIp}/>

                {/* Add Network Form */}
                <AddNetworkForm ip={ip}/>
            </div>
        </>
    )
}

