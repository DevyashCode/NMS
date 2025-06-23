export function FormInput({ inptLabel, placeholder, name }) {
    return (
        <>
            <div className="h-20 w-[49%] flex flex-col flex-grow gap-2">
                <label className="text-lg text-lightHeaderText">{inptLabel}</label>
                <input className="flex h-full w-full pl-3 rounded-md bg-lightInputElementBgColor dark:bg-darkInputElementBgColor text-lightInputElementTextColor" placeholder={placeholder} name={name}></input>
            </div>
        </>
    )
}

export function FormSelect({ inptLabel,name,options }) {
    return (
        <>
            <div className="h-20 w-[49%] flex flex-col flex-grow gap-2">
                <label className="text-lg text-lightHeaderText">{inptLabel}</label>
                <select name={name} defaultValue="" className="flex h-full w-full px-3 rounded-md bg-lightInputElementBgColor dark:bg-darkInputElementBgColor text-lightInputElementTextColor">
                    <option value="" disabled hidden>Select {inptLabel}</option>
                    {
                        options.map((optn)=>{
                            return <option value={optn}>{optn}</option>
                        })
                    }
                </select>
            </div>
        </>
    )
}