import Header from "../SectionHeader/header";
import AddNetworkForm from "./AddNetworkForm";
import SearchIpAddress from "./SearchIPAddress";

export default function AddNetwork() {
    return (
        <>
            <div className="flex flex-col h-full w-full items-center pl-10 pr-8">

                {/* Header */}
                <Header headerName="Add Network" />

                {/* IP search Bar */}
                <SearchIpAddress />

                {/* Add Network Form */}
                <AddNetworkForm/>
            </div>
        </>
    )
}

