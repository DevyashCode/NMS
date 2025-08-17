export default function PortWidget({ipAddress,macAddress,range,handleClick}){
    return (
        <>
        <div className="h-22 min-w-80 rounded-lg shadow-md bg-lightComponentBackground dark:bg-darkComponentBackground flex flex-grow-1 p-4 justify-between" onClick={()=>handleClick(ipAddress)}>
            <div className="w-[160px] h-full flex flex-col gap-1">
                <div className="size-7 flex justify-center items-center rounded-md text-xl font-semibold bg-[#4F46E5] text-[#FFFFFF]">IP</div>
                <div className="text-lg font-medium dark:text-[#E3E3E3]">{ipAddress}</div>
            </div>
            <div className="w-[201px] h-full flex flex-col gap-1 text-sm">
                <div className="pw-data-container">MAC : {macAddress}</div>
                <div className="pw-data-container">Range : {range}</div>
            </div>
        </div>
        </>
    )
}