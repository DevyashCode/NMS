import { FormInput, FormSelect } from "../Form/formInput";


const handleSubmit = (e) => {
    e.preventDefault();
}

export default function AddNetworkForm() {
    return (
        <div className="w-full mt-5 flex flex-col bg-lightComponentBackground rounded-2xl shadow-md px-9 py-4 dark:bg-darkComponentBackground">
            {/* Header */}
            <div className="h-12 flex items-center">
                <h1 className="text-lg text-lightHeaderText">Network Registration</h1>
            </div>

            {/* Form */}
            <form className="flex flex-wrap gap-3" onSubmit={(e) => { handleSubmit(e) }}>
                <FormInput inptLabel="IP Address" placeholder="Enter IP Address" name="ipAddress" />
                <FormInput inptLabel="Host Name" placeholder="Enter Host Name" name="hostName" />
                <FormInput inptLabel="MAC Address" placeholder="Enter MAC Address" name="macAddress" />
                <FormInput inptLabel="OS Name" placeholder="Enter OS" name="osName" />
                <FormInput inptLabel="Location" placeholder="Enter Location" name="location" />
                <FormInput inptLabel="Owner Name" placeholder="Enter Onwner Name" name="ownerName" />
                <FormInput inptLabel="Description" placeholder="Enter Description" name="description" />
                <FormSelect inptLabel="Type" name="type" options={["Wifi Router","Server","Switch"]}/>
                <div className="h-20 w-[49%] min-w-60 flex flex-grow gap-2">
                    <button type="submit" className="h-9 w-24 bg-lightButton mt-3 rounded-md text-white max-h-[34px]">Submit</button>
                    <button type="reset" className="h-9 w-24 bg-[#F8FAFC] dark:bg-[#262C36] text-[#6F7482] mt-3 rounded-md border-1 border-[#6F7482] max-h-[34px]">Reset</button>
                </div>
            </form>
        </div>
    )
}