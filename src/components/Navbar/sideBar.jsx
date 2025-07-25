import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { CgAddR } from "react-icons/cg";
import { FaList } from "react-icons/fa6";
import { IoIosSpeedometer } from "react-icons/io";
import { BsUsbSymbol } from "react-icons/bs";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { LuHistory } from "react-icons/lu";
import { IoIosSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { svSelector, svActions } from "../../Redux/Reducers/sideBarVisibilityReducer";

import mitsLogo from "./Nav Icons/mits-logo.png";
import userAvator from "./Nav Icons/Avatar.png";

const navItems = [
  { to: "dashboard", label: "Dashboard", icon: <TbLayoutDashboardFilled /> },
  { to: "addNetwork", label: "Add Network", icon: <CgAddR /> },
  { to: "networkList", label: "Network List", icon: <FaList /> },
  { to: "serverSpeedTest", label: "Server Speed Test", icon: <IoIosSpeedometer /> },
  { to: "portsAvailable", label: "Ports Available", icon: <BsUsbSymbol /> },
  { to: "changeRole", label: "Change Role", icon: <IoExtensionPuzzleOutline /> },
  { to: "history", label: "History", icon: <LuHistory /> },
  { to: "settings", label: "Settings", icon: <IoIosSettings /> },
  { to: "logout", label: "Logout", icon: <BiLogOut /> },
];

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1184);
  const isHidden = useSelector(svSelector);
  const dispatch = useDispatch();
  const navBgRef = useRef();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1184);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebarVisibility = () => {
    if (isMobile) dispatch(svActions.svToggle(true));
  };

  const toggleSidebarCollapse = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {isMobile && !isHidden && (
        <div
          ref={navBgRef}
          onClick={toggleSidebarVisibility}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20"
        ></div>
      )}

      {!isHidden && (
        <div
          className={`z-50 h-full bg-lightComponentBackground dark:bg-darkComponentBackground flex flex-col rounded-r-2xl font-poppins shadow-md ${
            isOpen ? "w-[280px]" : "min-w-[80px] w-[80px]"
          }`}
        >
          {/* Header */}
          <div className={`nav-header ${isOpen ? "" : "nav-justify-center"}`}>
            <img
              src={mitsLogo}
              alt="Mits Logo"
              className={`${isOpen ? "nav-logo" : "nav-justify-center nav-logo-closed"}`}
            />
            <h2 className={`font-semibold text-[1.2rem] dark:text-white ${isOpen ? "" : "hidden"}`}>
              NMS MITS
            </h2>
            {!isMobile && (
              <div
                className={`min-h-8 min-w-8 bg-lightComponentBackground dark:bg-darkComponentBackground border-2 border-lightBorderColor flex items-center justify-center rounded-full absolute ${
                  isOpen ? "left-[260px]" : "left-[65px]"
                }`}
                onClick={toggleSidebarCollapse}
              >
                {isOpen ? (
                  <IoIosArrowBack className="dark:text-white" />
                ) : (
                  <IoIosArrowForward className="dark:text-white" />
                )}
              </div>
            )}
          </div>

          {/* Nav Items */}
          <div className="mt-6 w-full text-lightNavbarText dark:text-darkNavbarText items-center font-normal">
            <div className="flex flex-col items-center">
              {navItems.slice(0, 6).map(({ to, label, icon }, i) => (
                <NavLink
                  key={i}
                  to={to}
                  onClick={toggleSidebarVisibility}
                  className={`navItem ${!isOpen && "nav-justify-center nav-item-closed-width"} ${
                    i !== 0 ? "mt-2" : ""
                  }`}
                >
                  <span className="text-lg">{icon}</span>
                  {isOpen && <span>{label}</span>}
                </NavLink>
              ))}
            </div>
            <hr className="mt-6" />
            <div className="flex flex-col items-center mt-6">
              {navItems.slice(6).map(({ to, label, icon }, i) => (
                <NavLink
                  key={i}
                  to={to}
                  onClick={toggleSidebarVisibility}
                  className={`navItem ${!isOpen && "nav-justify-center nav-item-closed-width"} ${
                    i !== 0 ? "mt-2" : ""
                  }`}
                >
                  <span className="text-lg">{icon}</span>
                  {isOpen && <span>{label}</span>}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex-grow"></div>
          <NavLink to="profile" onClick={toggleSidebarVisibility}>
            <div className="flex w-full h-[5rem] items-center p-5">
              <img
                src={userAvator}
                alt="User Avatar"
                className={isOpen ? "h-12 w-12 mr-3" : "h-10 w-10 mx-auto"}
              />
              {isOpen && (
                <div className="h-13 w-50 flex flex-col justify-center dark:text-darkWelcomeText">
                  <h3>Welcome Back</h3>
                  <h1>Admin</h1>
                </div>
              )}
              <IoIosArrowForward className="text-2xl dark:text-darkWelcomeText" />
            </div>
          </NavLink>
        </div>
      )}
    </>
  );
}