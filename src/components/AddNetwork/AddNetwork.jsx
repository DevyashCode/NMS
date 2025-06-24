import Header from "../SectionHeader/Header.jsx";
import AddNetworkForm from "./AddNetworkForm";
import SearchIpAddress from "./SearchIPAddress";
import { useState } from "react";


export default function AddNetwork() {
    const [ip,setIp] = useState("");
    return (
        <>
            <div className="flex flex-col h-full w-full items-center px-3.5 lg:pl-10 lg:pr-8">

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

