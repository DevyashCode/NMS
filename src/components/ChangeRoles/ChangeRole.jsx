import Header from "../SectionHeader/Header.jsx";
import UserTable from "./userTable";

export default function ChangeRole() {
    return (
        <>
            <div className="flex flex-col h-full w-full items-center pl-10 pr-8">

                {/* Header */}
                <Header headerName="Change Role" />

                {/* List */}
                <div className="w-full mt-5 flex flex-col bg-lightComponentBackground rounded-2xl shadow-md py-8 dark:bg-darkComponentBackground overflow-auto">
                    <UserTable />
                </div>
            </div>
        </>
    )
}

