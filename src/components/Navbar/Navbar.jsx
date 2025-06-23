import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { svSelector, svActions } from "../../Redux/Reducers/sideBarVisibilityReducer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import SideBar from "./sideBar";

function Navbar() {
    const [width, setWidth] = useState(window.innerWidth);
    const isHidden = useSelector(svSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        width <= 1184 ? dispatch(svActions.svToggle(true)) : dispatch(svActions.svToggle(false));
    }, [width])

    return (
        <>
            <div className="h-full w-full flex">
                {isHidden ? <></>:<SideBar/>}
                <Outlet />
            </div>
        </>
    )
}

export default Navbar;
