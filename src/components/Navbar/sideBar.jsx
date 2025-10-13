import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { use, useEffect, useRef, useState } from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { UserSelector } from "../../Redux/Reducers/AuthReducer";
import { logout } from "../../Redux/Reducers/AuthReducer";
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
import PopupContainer from "../Popups/PopupContainer";
import mitsLogo from "./Nav Icons/mits-logo.png";
import userAvator from "./Nav Icons/Avatar.png";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1184);
  const [showPopup, setShowPopup] = useState(false);
  const isHidden = useSelector(svSelector);
  const user = useSelector(UserSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navBgRef = useRef();

  const navItems = [
    { to: "dashboard", label: "Dashboard", icon: <TbLayoutDashboardFilled />, ishidden: false },
    { to: "addNetwork", label: "Add Network", icon: <CgAddR />, ishidden: user.role != "admin" },
    { to: "networkList", label: "Network List", icon: <FaList />, ishidden: user.role != "admin" },
    { to: "serverSpeedTest", label: "Server Speed Test", icon: <IoIosSpeedometer />, ishidden: user.role != "admin" },
    { to: "portsAvailable", label: "Ports Available", icon: <BsUsbSymbol />, ishidden: user.role != "admin" },
    { to: "changeRole", label: "Change Role", icon: <IoExtensionPuzzleOutline />, ishidden: user.role != "admin" },
    { to: "history", label: "History", icon: <LuHistory />, ishidden: user.role != "admin" },
    { to: "settings", label: "Settings", icon: <IoIosSettings />, ishidden: false },
    // { to: "logout", label: "Logout", icon: <BiLogOut /> },
  ];

  useEffect(() => {
    console.log("From Sidebar");
    console.log(user);
  }, []);

  const toggleSidebarVisibility = () => {
    if (isMobile) dispatch(svActions.svToggle(true));
  };

  const toggleSidebarCollapse = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setShowPopup(true);
  };

  const handleLogoutConfirmation = async () => {
    setShowPopup(false);
    await dispatch(logout());
    navigate("/");
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
          className={`z-50 h-full bg-lightComponentBackground dark:bg-darkComponentBackground flex flex-col rounded-r-2xl font-poppins shadow-md ${isOpen ? "w-[280px] 2xl:w-[450px]" : "min-w-[80px] w-[80px] 2xl:w-[150px]"
            }`}
        >
          {/* Header */}
          <div className={`nav-header ${isOpen ? "" : "nav-justify-center"}`}>
            <img
              src={mitsLogo}
              alt="Mits Logo"
              className={`${isOpen ? "nav-logo" : "nav-justify-center nav-logo-closed"}`}
            />
            <h2 className={`font-semibold text-[1.2rem] 2xl:text-2xl dark:text-white ${isOpen ? "" : "hidden"}`}>
              NMS MITS
            </h2>
            {!isMobile && (
              <div
                className={`min-h-8 min-w-8 bg-lightComponentBackground dark:bg-darkComponentBackground border-2 border-lightBorderColor flex items-center justify-center rounded-full absolute ${isOpen ? "left-[260px] 2xl:left-[345px]" : "left-[65px] 2xl:left-[125px]"
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
              {navItems.slice(0, 6).map(({ to, label, icon, ishidden }, i) => (
                !ishidden &&
                <NavLink
                  key={i}
                  to={to}
                  onClick={toggleSidebarVisibility}
                  className={`navItem ${!isOpen && "nav-justify-center nav-item-closed-width"} ${i !== 0 ? "mt-2" : ""
                    }`}
                >
                  <span className="text-lg 2xl:text-2xl">{icon}</span>
                  {isOpen && <span>{label}</span>}
                </NavLink>
              ))}
            </div>
            <hr className="mt-6" />
            <div className="flex flex-col items-center mt-6">
              {navItems.slice(6).map(({ to, label, icon, ishidden }, i) => (
                !ishidden &&
                <NavLink
                  key={i}
                  to={to}
                  onClick={toggleSidebarVisibility}
                  className={`navItem ${!isOpen && "nav-justify-center nav-item-closed-width"} ${i !== 0 ? "mt-2" : ""
                    }`}
                >
                  <span className="text-lg 2xl:text-2xl">{icon}</span>
                  {isOpen && <span>{label}</span>}
                </NavLink>
              ))}
              <div
                onClick={handleLogout}
                className={`navItem mt-2 ${!isOpen && "nav-justify-center nav-item-closed-width"}`}
              >
                <span className="text-lg 2xl:text-2xl"><BiLogOut /></span>
                {isOpen && <span>Logout</span>}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex-grow"></div>
          <NavLink to="profile" onClick={toggleSidebarVisibility}>
            <div className="flex w-full h-[5rem] 2xl:h-[8rem] items-center p-5">
              <img
                src={userAvator}
                alt="User Avatar"
                className={isOpen ? "h-12 w-12 2xl:h-18 2xl:w-18 mr-3" : "h-10 w-10 2xl:h-16 2xl:w-16 mx-auto"}
              />
              {isOpen && (
                <div className="h-13 w-50 2xl:h-18 2xl:text-xl flex flex-col justify-center dark:text-darkWelcomeText">
                  <h3>Welcome</h3>
                  <h1>{user ? user.first_name : "User"}</h1>
                </div>
              )}
              {isOpen &&
                <IoIosArrowForward className="text-2xl dark:text-darkWelcomeText" />
              }
            </div>
          </NavLink>
        </div>
      )}

      {
        showPopup &&
        <PopupContainer>
          <div className="bg-white dark:bg-darkComponentBackground rounded-xl p-6 w-110 max-w-full text-center">
            {/* Logout icon */}
            <div className="text-red-600 dark:text-red-400 text-6xl mb-4 select-none">
              {/* Simple logout icon using SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                />
              </svg>
            </div>
            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">
              Confirmation
            </h2>
            {/* Message */}
            <p className="mb-6 text-gray-900 dark:text-gray-200">
              Are you sure you want to Logout?
            </p>
            {/* Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogoutConfirmation}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </PopupContainer>
      }
    </>
  );
}