import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IsAuthorisedSelector } from "../Redux/Reducers/AuthReducer.jsx";
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
import NotFound from "../Pages/NotFound.jsx";
import LoginPage from "../components/Login/LoginPage.jsx";
import RedirectGoogleAuth from "../components/Login/GoogleRedirectHandler.jsx";
import Register from "../components/Login/Register.jsx";

const Routes = () => {
    const isAuthorized = useSelector(IsAuthorisedSelector);
    const routes = createBrowserRouter([
        {
            path: "*",
            element: <NotFound />,
        },
        {
            path: "", element: <LandingPage />, children: []
        },
        {
            path: "/login", element: <LoginPage />
        },
        {
            path: "/login/callback", element: <RedirectGoogleAuth />
        },
        {
            path: "/register", element: <Register />
        },
        {
            path: "/user", element: isAuthorized ? <Navbar /> : <Navigate to="/login" replace={true} />, children: [
                { index: true, element: <Navigate to="dashboard" replace /> },
                { path: "dashboard", element: <Dashboard /> },
                { path: "addNetwork", element: <AddNetwork /> },
                { path: "networkList", element: <NetworkList /> },
                { path: "serverSpeedTest", element: <ServerSpeedTest /> },
                { path: "portsAvailable", element: <PortsAvailable /> },
                { path: "changeRole", element: <ChangeRole /> },
                { path: "history", element: <History /> },
                { path: "settings", element: <Settings /> },
                { path: "profile", element: <UserProfile /> }
            ]
        }
    ]);
    return routes;
}

// export default routes;
export default Routes;