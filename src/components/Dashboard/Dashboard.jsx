import { TiWiFi } from "react-icons/ti";
import { HiServerStack } from "react-icons/hi2";
import { PiPlusCircleFill } from "react-icons/pi";
import { HiSwitchHorizontal } from "react-icons/hi";
import DashboardTable from "./DashboardTable.jsx";
import Header from "../SectionHeader/Header.jsx";
import DashboardWidget from "./Widget.jsx";
import statusCounter from "./statusCounter.jsx";
import { useState } from "react";
import { useSelector } from "react-redux";
import { UserSelector } from "../../Redux/Reducers/AuthReducer.jsx";

// Temporary
// import { IsAuthorisedSelector,UserSelector } from "../../Redux/Reducers/AuthReducer.jsx";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";


function Dashboard() {
    const widgets = [
        {
            icon: TiWiFi,
            bgColor: "bg-lightDashboardWidgetComponentIconBgColorBlue dark:bg-darkDashboardWidgetComponentIconBgColorBlue",
            iconColor: "text-lightDashboardWidgetComponentIconColorBlue",
            title: "Total Wifi Routers",
            value: "wifi router",
            statusCounter: statusCounter("wifi router")
        },
        {
            icon: HiServerStack,
            bgColor: "bg-lightDashboardWidgetComponentIconBgColorYellow dark:bg-darkDashboardWidgetComponentIconBgColorYellow",
            iconColor: "text-lightDashboardWidgetComponentIconColorYellow",
            title: "Total Servers",
            value: "server",
            statusCounter: statusCounter("server")
        },
        {
            icon: HiSwitchHorizontal,
            bgColor: "bg-lightDashboardWidgetComponentIconBgColorOrange dark:bg-darkDashboardWidgetComponentIconBgColorOrange",
            iconColor: "text-lightDashboardWidgetComponentIconColorOrange",
            title: "Total Switches",
            value: "switch",
            statusCounter: statusCounter("switch")
        },
        {
            icon: PiPlusCircleFill,
            bgColor: "bg-lightDashboardWidgetComponentIconBgColorPurple dark:bg-darkDashboardWidgetComponentIconBgColorPurple",
            iconColor: "text-lightDashboardWidgetComponentIconColorPurple",
            title: "Others",
            value: 'other',
            statusCounter: statusCounter("other"),
        },
    ];

    const [columnFilters, setColumnFilters] = useState([]);
    const user = useSelector(UserSelector);
    const handleClick = (type) => {
        setColumnFilters([{ id: "type", value: type }]);
    };

    // Temporary
    // const isAuthorized = useSelector(IsAuthorisedSelector);
    // const user = useSelector(UserSelector);
    // useEffect(()=>{
    //     console.log("After Redirect",isAuthorized, user);
    // },[])

    return (
        <>
            <div className="page-container scrollbar-hide">
                <Header headerName="Dashboard" />

                {/* Widgets */}
                <div className="w-full flex justify-between flex-wrap dark:text-darkWidgetText gap-3">
                    {widgets.map((widget, index) => (
                        <DashboardWidget key={index} {...widget} handleClick={handleClick} />
                    ))}
                </div>

                {/* Network Table */}
                <div className={"w-full flex flex-col bg-lightComponentBackground dark:bg-darkComponentBackground rounded-2xl shadow-md px-8 pt-4 "+ (user.role != 'user' ? 'mt-1 mb-12 lg:mt-4 min-h-128 2xl:min-h-150' : 'pb-2')}>
                    { (user.role === "admin" || user.role === "technician") &&
                        <div className="h-12 flex items-center">
                            <h1 className="text-lg 2xl:text-2xl text-lightHeaderText">Network Available</h1>
                        </div>
                    }

                    <div className="w-full rounded-xl">
                        {/* <DashboardTable columnFilter={columnFilter} setColumnFilter={setColumnFilter} /> */}
                        <DashboardTable columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
                    </div>

                </div>
            </div >
        </>
    )
}

export default Dashboard;
