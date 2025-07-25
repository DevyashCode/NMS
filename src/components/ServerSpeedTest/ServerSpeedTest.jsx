import Header from "../SectionHeader/Header.jsx";
import ServerSpeedResult from "./ServerSpeedResult";

export default function ServerSpeedTest() {
    return (
        <>
            <div className="page-container">

                {/* Header */}
                <Header headerName="Server Speed Test" />

                {/* Select Server Dropdown */}
                <div className="w-full min-h-20 rounded-xl shadow-md px-3 lg:px-6 flex bg-lightComponentBackground dark:bg-darkComponentBackground items-center">
                    <div className="flex h-9 min-w-40 flex-grow items-center justify-between pl-4 rounded-md bg-lightInputElementBgColor text-lightInputElementTextColor dark:bg-darkInputElementBgColor">
                        <select type="text" defaultValue="" placeholder="Enter IP Address" className="h-full outline-none w-full" >
                            <option value="" disabled hiddem>Select Server</option>
                        </select>
                    </div>
                </div>

                {/* Server Speed Test Container */}
                <div className="w-full mt-1 lg:mt-6 mb-12 rounded-xl shadow-md justify-around px-2 lg:px-6 py-8 flex bg-lightComponentBackground dark:bg-darkComponentBackground items-center flex-wrap">
                    <div className="min-w-72">
                        <div className="h-5 flex gap-3 items-center text-[#42404C] dark:text-lightInputElementTextColor">
                            <div className="h-full w-5 bg-[#468EE5] rounded-sm"></div> 
                            Point Progress
                        </div>
                        <div className="w-full h-80"></div>
                    </div>
                    <ServerSpeedResult />
                </div>
            </div>
        </>
    )
}

