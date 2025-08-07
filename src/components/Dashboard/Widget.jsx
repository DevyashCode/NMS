import { FaSquare } from "react-icons/fa";

export default function DashboardWidget({ icon: Icon, bgColor, iconColor, title, value, statusCounter, handleClick }) {
    const { count, workingCount } = statusCounter;
    return (
        <div
            className={`widget-container transform transition duration-200 hover:-translate-y-1 active:scale-95`}
            onClick={() => handleClick(value)}
        >
            <div className="w-full h-18 flex items-center justify-between">
                <div className={`h-16 w-16 rounded-full ${bgColor} flex items-center justify-center text-3xl`}>
                    <Icon className={iconColor} />
                </div>
            </div>
            <div className="w-full h-16 pl-2 mt-1">
                <div className="flex justify-between">
                    <div className="text-2xl font-bold text-lightDashboardWidgetComponentCountTextColor dark:text-darkWidgetText">{count}</div>
                    <div className="flex items-center font-semibold">
                        <FaSquare className="mr-1 text-DashboardWidgetComponentWorkingCountIndicator" /> {workingCount}
                        <FaSquare className="ml-2 mr-1 text-DashboardWidgetComponentNotWorkingCountIndicator" /> {count - workingCount}
                    </div>
                </div>
                <div className="text-lightDashboardWidgetComponentDescTextColor dark:text-darkWidgetText">{title}</div>
            </div>
        </div>
    );
}
