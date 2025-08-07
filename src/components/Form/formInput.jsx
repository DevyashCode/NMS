export function FormInput({ inptLabel, placeholder, name, val,handleChange,disabled }) {
    return (
        <>
            <div className="h-20 w-[49%] flex flex-col flex-grow gap-2">
                <label className="text-lg text-lightHeaderText">{inptLabel}</label>
                <input className="flex h-full w-full pl-3 rounded-md bg-lightInputElementBgColor dark:bg-darkInputElementBgColor text-lightInputElementTextColor" placeholder={placeholder} name={name} value={val} onChange={(e)=>handleChange(e.target.value)} disabled={disabled}></input>
            </div>
        </>
    )
}

export function FormSelect({ inptLabel, name, options, handleChange, val = "" }) {
  return (
    <div className="h-20 w-[49%] flex flex-col flex-grow gap-2 ">
      <label className="text-lg text-lightHeaderText">{inptLabel}</label>
      <select
        name={name}
        value={val}
        onChange={(e) => {
          handleChange(e.target.value); 
        }}
        className="flex h-full w-full px-3 rounded-md bg-lightInputElementBgColor dark:bg-darkInputElementBgColor text-lightInputElementTextColor"
      >
        <option value="" hidden>
          Select {inptLabel}
        </option>
        {options.map((optn, i) => (
          <option key={i} value={optn.toLowerCase()}>
            {optn}
          </option>
        ))}
      </select>
    </div>
  );
}
