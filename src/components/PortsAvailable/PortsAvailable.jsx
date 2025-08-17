import Header from "../SectionHeader/Header.jsx";
import SearchIpPorts from "./SearchPorts";
import PortWidget from "./portwidget";
import PopupContainer from "../Popups/PopupContainer.jsx";
import PortPopup from "./PortPopup.jsx";
import { useSelector } from "react-redux";
import { portSelector } from "../../Redux/Reducers/portReducer";
import { useState } from "react";

export default function PortsAvailable() {
    const ports = useSelector(portSelector);
    const [ip,setIp] = useState("");
    const [showPopup,setShowPopup] = useState(false);

    const handlePortClick = (SelectedIp) => {
        setIp(SelectedIp);
        setShowPopup(true);
    }

    const handlePopupClose = () => {
        setShowPopup(false);
    }

    return (
        <>
            <div className="page-container">

                {/* Header */}
                <Header headerName="Ports Available" />

                {/* Search Ports */}
                <SearchIpPorts />

                {/* Ports Container */}
                <div className="pw-container scrollbar-hide">
                    {
                        ports.map((port, index) => {
                            return <PortWidget key={index} ipAddress={port.ipAddress} macAddress={port.macAddress} range={port.portRange} handleClick={handlePortClick}/>
                        })
                    }
                </div>

            </div>

            {showPopup &&
                <PopupContainer handlePopupClose={handlePopupClose} className={"h-[62%] lg:h-[58%] w-[90%] lg:w-[45%]"}>
                    <PortPopup 
                    ip={ip} 
                    handlePopupClose={handlePopupClose} 
                    />
                </PopupContainer>
            }
        </>
    )
}

