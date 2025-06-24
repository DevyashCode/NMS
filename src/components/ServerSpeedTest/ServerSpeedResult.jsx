import { MdOutlineFileDownload } from "react-icons/md";
import { MdOutlineFileUpload } from "react-icons/md";
import { MdOutlineNetworkPing } from "react-icons/md";
import { IoGlobeOutline } from "react-icons/io5";
import { FaLocationCrosshairs } from "react-icons/fa6";


export default function ServerSpeedResult() {
    return (
        <>
            <div className="w-[60%] min-w-75 bg-[#F9FBFF] dark:bg-[#172339] rounded-xl p-4 lg:p-8 flex flex-wrap gap-12">
                {/* Heading */}
                <div className="w-full h-10 flex items-center flex-wrap gap-3">
                    <h1 className="font-semi text-2xl text-[#3D3C42] dark:text-[#E3E3E3]">Test Result</h1>
                    <div className="flex-grow"></div>
                    <div className="w-[30%] min-w-45 h-[70%] rounded-md bg-[#E1EAFF] flex items-center px-3 text-[#7D7D7D] gap-1 dark:bg-darkInputElementBgColor">Test Time :<span className="font-semibold text-[#5B93FF]">20 Secs</span></div>
                </div>

                {/* Main */}
                <div className="flex flex-col w-full">
                    <div className="wi-full flex flex-wrap gap-2 lg:gap-10">
                        <div className="px-1 lg:px-4">
                            <MdOutlineFileDownload className="size-5 lg:size-8 font-semibold text-[#468EE5]" />
                            <h2 className="text-sm lg:text-lg text-[#3D3C42] dark:text-lightInputElementTextColor">Download Speed</h2>
                            <h3 className="text-[#7D7D7D] text-xs">50 mb/s</h3>
                        </div>
                        <div className="px-1 lg:px-4">
                            <MdOutlineFileUpload className="size-5 lg:size-8 font-semibold text-[#468EE5]" />
                            <h2 className="text-sm lg:text-lg text-[#3D3C42] dark:text-lightInputElementTextColor">Upload Speed</h2>
                            <h3 className="text-[#7D7D7D] text-xs lg:text-md">20 mb/s</h3>
                        </div>
                        <div className="px-1 lg:px-4">
                            <MdOutlineNetworkPing className="size-5 lg:size-8 font-semibold text-[#468EE5]" />
                            <h2 className="text-sm lg:text-lg text-[#3D3C42] dark:text-lightInputElementTextColor">Ping</h2>
                            <h3 className="text-[#7D7D7D] text-xs lg:text-md">20 ms</h3>
                        </div>
                        <div className="px-1 lg:px-4">
                            <IoGlobeOutline className="size-5 lg:size-8 font-semibold text-[#468EE5]" />
                            <h2 className="text-sm lg:text-lg text-[#3D3C42] dark:text-lightInputElementTextColor">Internet Service Provider</h2>
                            <h3 className="text-[#7D7D7D] text-xs lg:text-md">Jio Net Pvt.Ltd</h3>
                        </div>
                        <div className="px-1 lg:px-4">
                            <FaLocationCrosshairs className="size-5 lg:size-8 font-semibold text-[#468EE5]" />
                            <h2 className="text-sm lg:text-lg text-[#3D3C42] dark:text-lightInputElementTextColor">Location</h2>
                            <h3 className="text-[#7D7D7D] text-xs lg:text-md">Gwalior</h3>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}