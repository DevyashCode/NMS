import { createBrowserRouter, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import Dashboard from "../components/Dashboard/Dashboard.jsx";
import AddNetwork from "../components/AddNetwork/AddNetwork.jsx";
import NetworkList from "../components/NetworkList/NetworkLIst.jsx";
import PortsAvailable from "../components/PortsAvailable/PortsAvailable.jsx";
import ServerSpeedTest from "../components/ServerSpeedTest/ServerSpeedTest.jsx";
import ChangeRole from "../components/ChangeRoles/ChangeRole.jsx";
import History from "../components/History/History.jsx";
import Settings from "../components/settings/Settings.jsx";
import UserProfile from "../components/Profile/Profile.jsx";
import LandingPage from "../components/LandingPage/LandingPage.jsx";

const routes = createBrowserRouter([
    {
        path:"", element: <LandingPage/> , children : [] 
    },
    {
        path: "/user", element: <Navbar />, children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "addNetwork", element: <AddNetwork /> },
            { path: "networkList", element: <NetworkList /> },
            { path: "serverSpeedTest", element: <ServerSpeedTest /> },
            { path: "portsAvailable", element: <PortsAvailable /> },
            { path: "changeRole", element: <ChangeRole /> },
            { path: "history", element: <History /> },
            { path: "settings", element: <Settings /> },
            { path: "logout", element:<Navigate to="/dashboard" replace/>},
            { path: "profile", element:<UserProfile/>}
        ]
    }
]);

export default routes;