export default function PortWidget({ipAddress,macAddress,range}){
    return (
        <>
        <div className="h-22 min-w-90 max-w-92 rounded-lg shadow-md bg-lightComponentBackground dark:bg-darkComponentBackground flex flex-grow p-4">
            <div className="w-[45%] h-full flex flex-col gap-1">
                <div className="size-7 flex justify-center items-center rounded-md text-xl font-semibold bg-[#4F46E5] text-[#FFFFFF]">IP</div>
                <div className="text-lg font-medium dark:text-[#E3E3E3]">{ipAddress}</div>
            </div>
            <div className="w-[55%] h-full flex flex-col gap-1 text-sm">
                <div className="pw-data-container">MAC : {macAddress}</div>
                <div className="pw-data-container">Range : {range}</div>
            </div>
        </div>
        </>
    )
}