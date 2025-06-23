import Header from "../SectionHeader/header";
import ServerSpedResult from "./ServerSpeedResult";

export default function ServerSpeedTest() {
    return (
        <>
            <div className="flex flex-col h-full w-full items-center pl-10 pr-8 overflow-auto">

                {/* Header */}
                <Header headerName="Server Speed Test" />

                {/* Select Server Dropdown */}
                <div className="w-full min-h-20 rounded-xl shadow-md px-6 flex bg-lightComponentBackground dark:bg-darkComponentBackground items-center">
                    <div className="flex h-9 min-w-50 flex-grow items-center justify-between pl-3 rounded-md mr-3 bg-lightInputElementBgColor text-lightInputElementTextColor dark:bg-darkInputElementBgColor">
                        <select type="text" defaultValue="" placeholder="Enter IP Address" className="h-full outline-none w-full" >
                            <option value="" disabled hiddem>Select Server</option>
                        </select>
                    </div>
                </div>

                {/* Server Speed Test Container */}
                <div className="w-full mt-8 rounded-xl shadow-md justify-around px-6 py-8 flex bg-lightComponentBackground dark:bg-darkComponentBackground items-center flex-wrap">
                    <div className="w-[36%] min-w-60">
                        <div className="h-5 flex gap-3 items-center text-[#42404C] dark:text-lightInputElementTextColor">
                            <div className="h-full w-5 bg-[#468EE5] rounded-sm"></div> 
                            Point Progress
                        </div>
                        <div className="border-1 w-full h-80"></div>
                    </div>
                    <ServerSpedResult />
                </div>
            </div>
        </>
    )
}

