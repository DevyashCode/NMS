import Header from "../SectionHeader/Header.jsx";
import AddNetworkForm from "./AddNetworkForm";
import SearchIpAddress from "./SearchIPAddress";

export default function AddNetwork() {
    return (
        <>
            <div className="flex flex-col h-full w-full items-center px-3.5 lg:pl-10 lg:pr-8">

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

