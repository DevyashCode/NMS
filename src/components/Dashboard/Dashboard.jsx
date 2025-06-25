import { TiWiFi } from "react-icons/ti";
import { HiServerStack } from "react-icons/hi2";
import { PiPlusCircleFill } from "react-icons/pi";
import { HiSwitchHorizontal } from "react-icons/hi";
import DashboardTable from "./DashboardTable.jsx";
import Header from "../SectionHeader/Header.jsx";
import DashboardWidget from "./Widget.jsx";
import statusCounter from "./statusCounter.jsx";


function Dashboard() {
    const widgets = [
        {
            icon: TiWiFi,
            bgColor: "bg-lightDashboardWidgetComponentIconBgColorBlue dark:bg-darkDashboardWidgetComponentIconBgColorBlue",
            iconColor: "text-lightDashboardWidgetComponentIconColorBlue",
            title: "Total Wifi Routers",
            statusCounter:statusCounter("wifi router")
        },
        {
            icon: HiServerStack,
            bgColor: "bg-lightDashboardWidgetComponentIconBgColorYellow dark:bg-darkDashboardWidgetComponentIconBgColorYellow",
            iconColor: "text-lightDashboardWidgetComponentIconColorYellow",
            title: "Total Servers",
            statusCounter:statusCounter("server")
        },
        {
            icon: HiSwitchHorizontal,
            bgColor: "bg-lightDashboardWidgetComponentIconBgColorOrange dark:bg-darkDashboardWidgetComponentIconBgColorOrange",
            iconColor: "text-lightDashboardWidgetComponentIconColorOrange",
            title: "Total Switches",
            statusCounter:statusCounter("switch")
        },
        {
            icon: PiPlusCircleFill,
            bgColor: "bg-lightDashboardWidgetComponentIconBgColorPurple dark:bg-darkDashboardWidgetComponentIconBgColorPurple",
            iconColor: "text-lightDashboardWidgetComponentIconColorPurple",
            title: "Others",
            statusCounter:statusCounter("other")
        },
    ];

    return (
        <>
            <div className="page-container scrollbar-hide">
                <Header headerName="Dashboard" />

                {/* Widgets */}
                <div className="w-full flex justify-between flex-wrap dark:text-darkWidgetText gap-3">
                    {widgets.map((widget, index) => (
                        <DashboardWidget key={index} {...widget} />
                    ))}
                </div>

                {/* Network Table */}
                <div className="w-full mt-1 mb-12 lg:mt-4 min-h-128 flex flex-col bg-lightComponentBackground dark:bg-darkComponentBackground rounded-2xl shadow-md px-8 pt-4">
                    <div className="h-12 flex items-center">
                        <h1 className="text-lg text-lightHeaderText">Network Available</h1>
                    </div>

                    <div className="w-full rounded-xl">
                        <DashboardTable />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Dashboard;
