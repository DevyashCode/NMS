export function FormInput({ inptLabel, placeholder, name, val }) {
    return (
        <>
            <div className="h-20 w-[49%] flex flex-col flex-grow gap-2">
                <label className="text-lg text-lightHeaderText">{inptLabel}</label>
                <input className="flex h-full w-full pl-3 rounded-md bg-lightInputElementBgColor dark:bg-darkInputElementBgColor text-lightInputElementTextColor" placeholder={placeholder} name={name} value={val} disabled={val && true}></input>
            </div>
        </>
    )
}

export function FormSelect({ inptLabel, name, options, val }) {
    const isDisabled = val ? true : false ;
    return (
        <>
            <div className="h-20 w-[49%] flex flex-col flex-grow gap-2 ">
                <label className="text-lg text-lightHeaderText">{inptLabel}</label>
                <select name={name} value={val || ""} className="flex h-full w-full px-3 rounded-md bg-lightInputElementBgColor dark:bg-darkInputElementBgColor text-lightInputElementTextColor">
                    <option value="" hidden>Select {inptLabel}</option>
                    {
                        options.map((optn, i) => {
                            return <option key={i} value={optn}>{optn}</option>
                        })
                    }
                </select>
            </div>
        </>
    )
}