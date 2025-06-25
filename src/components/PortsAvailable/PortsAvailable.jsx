import Header from "../SectionHeader/Header.jsx";
import SearchIpPorts from "./SearchPorts";
import PortWidget from "./portwidget";
import { useSelector } from "react-redux";
import { portSelector } from "../../Redux/Reducers/portReducer";

export default function PortsAvailable() {
    const ports = useSelector(portSelector);
    return (
        <>
            <div className="page-container">
                
                {/* Header */}
                <Header headerName="Ports Available"/>

                {/* Search Ports */}
                <SearchIpPorts/>

                {/* Ports Container */}
                <div className="pw-container scrollbar-hide">
                    {
                        ports.map((port,index)=>{
                            return <PortWidget key={index} ipAddress={port.ipAddress} macAddress={port.macAddress} range={port.portRange}/>
                        })
                    }
                </div>

            </div>
        </>
    )
}

