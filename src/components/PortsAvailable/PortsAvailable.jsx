import Header from "../SectionHeader/Header.jsx";
import SearchIpPorts from "./SearchPorts";
import PortWidget from "./portwidget";
import { useSelector } from "react-redux";
import { portSelector } from "../../Redux/Reducers/portReducer";

export default function PortsAvailable() {
    const ports = useSelector(portSelector);
    console.log(ports);
    return (
        <>
            <div className="flex flex-col h-full w-full items-center pl-10 pr-8">
                
                {/* Header */}
                <Header headerName="Ports Available"/>

                {/* Search Ports */}
                <SearchIpPorts/>

                {/* Ports Container */}
                <div className="pw-container scrollbar-hide">
                    {
                        ports.map((port)=>{
                            return <PortWidget ipAddress={port.ipAddress} macAddress={port.macAddress} range={port.portRange}/>
                        })
                    }
                </div>

            </div>
        </>
    )
}

