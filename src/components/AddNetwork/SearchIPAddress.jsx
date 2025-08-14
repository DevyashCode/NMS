import { useRef, useState, useEffect } from "react";
import { scanIp } from "../../Redux/Reducers/NetworkListReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  NetworkLoadingScan,
  NetworkScannedDataSelector,
  NetworkListSelector,
} from "../../Redux/Reducers/NetworkListReducer";
import PopupContainer from "../Popups/PopupContainer";
import Lottie from "lottie-react";
import Animation from "../Loading/PurpleLoader.json";

export default function SearchIpAddress({ setMacAddress, setIpAddress, setHostname, setOS }) {
  const inpRef = useRef();
  const dispatch = useDispatch();
  const [ip, setIp] = useState("");
  const loading = useSelector(NetworkLoadingScan);
  const data = useSelector(NetworkListSelector);
  const [networkAlreadyExists, setNetworkAlreadyExists] = useState(false);
  const [existingData,setExistingData] = useState("");
  const scannedData = useSelector(NetworkScannedDataSelector);
  const [showPopup, setShowPopup] = useState(false);

  // Error toast states
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const errorTimerRef = useRef(null);

  // IPv4 validation
  const isValidIPv4 = (value) => {
    if (!value) return false;
    const parts = value.trim().split(".");
    if (parts.length !== 4) return false;
    for (const p of parts) {
      if (p === "" || !/^\d+$/.test(p)) return false;
      const n = Number(p);
      if (n < 0 || n > 255) return false;
      if (p.length > 1 && p.startsWith("0")) return false;
    }
    return true;
  };

  const triggerError = (msg) => {
    setError(msg);
    setShowError(true); // start enter animation

    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);

    // Hide after 3s with exit animation
    errorTimerRef.current = setTimeout(() => {
      setShowError(false); // trigger exit animation
      setIp("");
      setTimeout(() => setError(""), 500); // remove text after exit finishes
    }, 3000);
  };

  const handleClick = () => {
    if (!ip || ip.trim() === "") {
      triggerError("Please enter a valid IP address");
      return;
    }

    if (!isValidIPv4(ip)) {
      triggerError("Please enter a valid IP address");
      return;
    }

    setShowPopup(true);
    const existingIpDetails = data.find(network => network.ip_address === ip);
    if (existingIpDetails) {
      setExistingData({
        mac: existingIpDetails.mac_address,
        ip: existingIpDetails.ip_address,
        hostname: existingIpDetails.hostname,
        os: existingIpDetails.os,
        location: existingIpDetails.location,
        description: existingIpDetails.description,
        type: existingIpDetails.type,
      });
      setNetworkAlreadyExists(true);
    }
    else {
      dispatch(scanIp({ ip }));
    }
  };

  useEffect(() => {
    return () => {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, []);

  const handleContinue = () => {
    setMacAddress(scannedData[0].mac);
    setIpAddress(scannedData[0].ip);
    setHostname(scannedData[0].hostname);
    setOS(scannedData[0].os);
    setShowPopup(false);
    setIp("");
  }

  return (
    <>
      {/* Animation styles */}
      <style>
        {`
          @keyframes slideFadeIn {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideFadeOut {
            0% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-20px); }
          }
          .error-enter {
            animation: slideFadeIn 0.5s ease-in-out forwards;
          }
          .error-exit {
            animation: slideFadeOut 0.5s ease-in-out forwards;
          }
        `}
      </style>

      {/* Input + Search */}
      <div className="w-full min-h-20 rounded-xl shadow-md px-6 py-3 flex bg-lightComponentBackground dark:bg-darkComponentBackground justify-center items-center gap-3">
        <div className="flex h-9 min-w-40 flex-grow items-center justify-between pl-3 rounded-md bg-lightInputElementBgColor text-lightInputElementTextColor dark:bg-darkInputElementBgColor">
          <input
            ref={inpRef}
            type="text"
            placeholder="Enter IP Address"
            className="h-full outline-none w-full"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleClick();
            }}
          />
        </div>
        <button
          className="h-9 w-24 bg-lightButton rounded-md text-white max-h-[34px]"
          onClick={handleClick}
        >
          Search
        </button>
      </div>

      {/* Animated Error Toast */}
      {error && (
        <div
          className={`absolute top-5 transform py-3 px-5 rounded-lg shadow-lg mt-2 text-red-600 bg-lightComponentBackground dark:bg-darkComponentBackground text-sm ${showError ? "error-enter" : "error-exit"
            }`}
          style={{
            minWidth: "250px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      {/* Popup */}
      {showPopup && (
        <PopupContainer
          className={`justify-center items-center ${loading ? "w-110 h-60" : "w-150 h-90"
            }`}
        >
          {loading && (
            <div className="w-50 h-50">
              <Lottie animationData={Animation} />
            </div>
          )}

          {!loading && (
            <div className="h-full w-full flex flex-col gap-2">
              <div className="h-12 flex items-center text-lg text-lightHeaderText justify-between w-full">
                <h1>IP : {ip}</h1>
                <div className={(networkAlreadyExists ? "border-orange-400 text-orange-500 bg-orange-200/30 dark:bg-orange-200/10" : "border-green-500 text-green-500 bg-green-200/30 dark:bg-green-200/10") + " h-[60%] rounded-lg border-2 text-sm flex justify-center items-center px-3"}>
                  {networkAlreadyExists ? "Network Already Exists" : "Scanning Successful"}
                </div>
              </div>

              <div className="h-[70%] w-full p-8 rounded-xl bg-lightInputElementBgColor text-gray-500 dark:bg-darkInputElementBgColor">
                {Object.keys(scannedData || {}).length > 0 || Object.keys(existingData || {}).length > 0 ? (
                  <div className="h-full w-full overflow-auto scrollbar-hide">
                    <pre
                      style={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {/* Display Data */}
                      {JSON.stringify(scannedData[0] || existingData, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">No data found</div>
                )}
              </div>

              <div className="mt-3 w-full flex justify-between">
                <div></div>
                <div className="flex gap-2">
                  {networkAlreadyExists ?
                    <></> :
                    scannedData ?
                      <button className="h-8 w-25 bg-lightButton rounded-sm text-white max-h-[34px] flex justify-center items-center"
                        onClick={() => { handleContinue() }}
                      >
                        Continue
                      </button>
                      : <></>
                  }

                  <button
                    className="h-8 w-20 bg-red-600 rounded-sm text-white max-h-[34px] flex justify-center items-center"
                    onClick={() => {
                      setShowPopup(false);
                      setIp("");
                      if(existingData){setExistingData("");}
                      if(networkAlreadyExists){setNetworkAlreadyExists(false);}
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </PopupContainer >
      )
      }
    </>
  );
}
