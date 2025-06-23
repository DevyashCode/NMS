import Header from "../SectionHeader/header";
import NetworkTable from "./NetworkTable";

export default function NetworkList() {
    return (
        <>
            <div className="flex flex-col h-full w-full items-center pl-8 pr-8 overflow-auto">
                
                {/* Header */}
                <Header headerName="Network List"/>

                {/* List */}
                <div className="w-full mt-5 flex flex-col bg-lightComponentBackground rounded-2xl shadow-md py-8 dark:bg-darkComponentBackground">
                    <NetworkTable/>
                </div>
            </div>
        </>
    )
}

