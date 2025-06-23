import { IoIosSearch } from "react-icons/io";
 
function Filters({globalFilter,setGlobalFilter}) {
    return (
            <div className="flex h-9 w-80 items-center justify-between pl-4 pr-3 rounded-xl bg-lightInputElementBgColor text-lightInputElementTextColor dark:bg-darkInputElementBgColor justify-self-end">
                <input type="text" placeholder="Search" className="h-full outline-none flex-auto" value = {globalFilter} onChange={e=>setGlobalFilter(e.target.value)}/>
                <IoIosSearch className="text-xl" />
            </div>
    )
}

export default Filters;