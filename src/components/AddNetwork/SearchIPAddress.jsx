import { useRef } from "react"

export default function SearchIpAddress({setIp}) {
    const inpRef = useRef();
    return (
        <>
            <div className="w-full min-h-20 rounded-xl shadow-md px-6 py-3 flex bg-lightComponentBackground dark:bg-darkComponentBackground justify-center items-center gap-3">
                <div className="flex h-9 min-w-40 flex-grow items-center justify-between pl-3 rounded-md bg-lightInputElementBgColor text-lightInputElementTextColor dark:bg-darkInputElementBgColor">
                    <input ref={inpRef} type="text" placeholder="Enter IP Address" className="h-full outline-none w-full" />
                </div>
                <button className="h-9 w-24 bg-lightButton rounded-md text-white max-h-[34px]" onClick={()=>{setIp(inpRef.current.value)}} >Search</button>
            </div>
        </>
    )
}