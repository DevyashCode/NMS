import Header from "../SectionHeader/Header.jsx";
import NetworkTable from "./NetworkTable";

export default function NetworkList() {
    return (
        <>
            <div className="page-container scrollbar-hide">
                
                {/* Header */}
                <Header headerName="Network List"/>

                {/* List */}
                <div className="w-full mb-12 mt-1 lg:mt-5 flex flex-col bg-lightComponentBackground rounded-2xl px-5 shadow-md py-8 dark:bg-darkComponentBackground">
                    <NetworkTable/>
                </div>
            </div>
        </>
    )
}

