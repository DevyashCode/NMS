export default function SearchIpPorts() {
    return (
        <>
            <div className="w-full h-20 rounded-xl shadow-md px-6 py-3 flex bg-lightComponentBackground dark:bg-darkComponentBackground">
                <div className="flex h-9 min-w-55 mt-3 flex-grow items-center justify-between pl-3 rounded-md mr-3 bg-lightInputElementBgColor text-lightInputElementTextColor dark:bg-darkInputElementBgColor">
                    <input type="text" placeholder="Enter IP Address" className="h-full outline-none w-full" />
                </div>
                <button className="h-9 w-24 bg-lightButton mt-3 rounded-md text-white max-h-[34px]">Search</button>
            </div>
        </>
    )
}