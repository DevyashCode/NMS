import Header from "../SectionHeader/Header.jsx";
import UserTable from "./userTable";

export default function ChangeRole() {
    return (
        <>
            <div className="page-container">

                {/* Header */}
                <Header headerName="Change Role" />

                {/* List */}
                <div className="w-full lg:mt-5 mb-12 flex flex-col bg-lightComponentBackground rounded-2xl shadow-md py-8 dark:bg-darkComponentBackground overflow-auto">
                    <UserTable />
                </div>
            </div>
        </>
    )
}

