import { useEffect } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { themeActions } from "../../Redux/Reducers/themeReducer";
import { themeSelector } from "../../Redux/Reducers/themeReducer";
import { useSelector } from "react-redux";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { svActions, svSelector } from "../../Redux/Reducers/sideBarVisibilityReducer";

export default function Header({headerName}) {
    const dispatch = useDispatch();
    const isHidden = useSelector(svSelector);
    const theme = useSelector(themeSelector);

    const toggleSV = ()=>{
        dispatch(svActions.svToggle(!isHidden));
    }

    useEffect(()=>{
        if(theme === 'dark'){
            document.documentElement.classList.add("dark");
        }
    },[])

    return (
        <>
            <div className="w-full min-h-20 flex items-center  2xl:min-h-30">
                {(isHidden || window.innerWidth<=1184) ? <IoMenu className="text-3xl text-lightHeaderText dark:text-[#6F7482] mr-2" onClick={()=>{toggleSV()}}/> : <></>}
                <h1 className="text-xl 2xl:text-3xl text-lightHeaderText dark:text-[#6F7482]">{headerName}</h1>
                <div className="flex-grow"></div>
                <div className="h-9 w-9 2xl:h-12 2xl:w-12 rounded-lg flex items-center justify-center mr-1 text-lightHeaderText hover:bg-lightButtonBgColor dark:hover:bg-darkElementHoverBg dark:text-darkHeaderButtonText" onClick={()=>{dispatch(themeActions.toggle())}}>
                    {/* <MdOutlineLightMode className="h-6 w-6"/> */}
                    { theme === "dark" ? <MdOutlineLightMode className="h-6 w-6 2xl:h-8 2xl:w-8"/> : <MdOutlineDarkMode className="h-6 w-6 2xl:h-8 2xl:w-8"/> }
                </div>
                <div className="h-9 w-9 2xl:h-12 2xl:w-12 rounded-lg flex items-center justify-center text-lightHeaderText hover:bg-lightButtonBgColor dark:hover:bg-darkElementHoverBg dark:text-darkHeaderButtonText">
                    <IoIosNotificationsOutline className="h-6 w-6 2xl:h-8 2xl:w-8" />
                </div>
            </div>
        </>
    )
}