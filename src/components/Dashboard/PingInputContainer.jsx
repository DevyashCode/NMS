import { useEffect, useState } from "react";
import axios from "axios";
import PopupContainer from "../Popups/PopupContainer";
import Lottie from "lottie-react";
import Animation from "../Loading/PurpleLoader.json";
import { VscCircleFilled } from "react-icons/vsc";
import ObjectDisplay from "../ObjectDisplay/ObjectDisplay";

function PingInput() {
    const [value, setValue] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [moreInfo, setMoreInfo] = useState(true);
    const [pingResponse, setPingResponse] = useState("");

    useEffect(() => {
        setLoading(false);
    }, [pingResponse])

    const handleClick = async () => {
        setShowPopup(true);
        setLoading(true);

        const data = {
            ip: value
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/Ping/', data);
            console.log('Response:', response.data);
            setPingResponse(response.data);
        } catch (error) {
            console.error('Error:', error);
        }

    }

    return (
        <>
            <div className="flex h-9 min-w-[12.5rem] max-w-[20rem] 2xl:max-w-[28rem] 2xl:h-11 flex-grow gap-3 items-center  justify-between text-lightInputElementTextColor">
                <input
                    type="text"
                    placeholder="Ping Live IP Address"
                    value={value}
                    className="rounded-lg h-full outline-none min-w-[10rem] flex-grow bg-lightInputElementBgColor dark:bg-darkInputElementBgColor px-3"
                    onChange={(e) => { setValue(e.target.value) }}
                />
                <button
                    className="h-10 2xl:h-11 2xl:max-h-11 2xl:w-[6rem] 2xl:text-xl w-[4.5rem] bg-lightButton rounded-lg text-white max-h-[34px]"
                    onClick={handleClick}
                >
                    PING
                </button>
            </div>

            {
                showPopup &&
                (
                    <PopupContainer
                        className={`justify-center items-center ${loading ? "w-110 h-60" : "w-150"}`}
                    >

                        {loading && (
                            <>
                                <div className="w-50 h-50 flex flex-col justify-center items-center -mt-8">
                                    <Lottie animationData={Animation} />
                                </div>
                                <div className="w-full flex flex-col items-center -mt-7">
                                    <h1 className="dark:text-white font-bold text-lg">Pinging</h1>
                                    <p className="text-lg text-[#4F46E5] dark:text-[#8179FF]">Please wait while we ping the IP Address</p>
                                </div>
                            </>
                        )}

                        {!loading && (
                            <div className="h-full w-full flex flex-col gap-2">
                                <div className="h-12 flex items-center text-lg text-lightHeaderText justify-between w-full">
                                    <h1>IP : {value}</h1>
                                    <div className={(pingResponse.is_active ? "border-green-500 text-green-500 bg-green-200/30 dark:bg-green-200/10" : "border-red-400 text-red-500 bg-red-200/30 dark:bg-orange-200/10") + " h-[60%] rounded-lg border-2 text-sm flex justify-center items-center px-3"}>
                                        {pingResponse.is_active ? "Ping Successful" : "Unable to Ping"}
                                    </div>
                                </div>

                                <div className="h-[70%] w-full rounded-xl border-2 border-gray-400 dark:border-gray-500">
                                    <div className="flex py-6 px-5 gap-3">
                                        <h1 className="text-lightHeaderText text-lg">Status :</h1>
                                        <p
                                            className={
                                                (pingResponse.is_active
                                                    ? "bg-lightStatusBgOn dark:bg-darkStatusBgOn text-lightStatusTextOn border-lightStatusTextOn"
                                                    : "bg-lightStatusBgOf dark:bg-darkStatusBgOf text-lightStatusTextOf border-lightStatusTextOf dark:text-darkStatusTextOf dark:border-darkStatusTextOf") +
                                                " flex items-center justify-center w-16 2xl:w-18 h-7 2xl:h-8 rounded-lg border-2"
                                            }
                                        >
                                            <VscCircleFilled className="mr-1" />
                                            {pingResponse.is_active ? " ON" : " OF"}
                                        </p>
                                    </div>
                                </div>

                                {
                                    moreInfo &&
                                    <div className="h-[70%] w-full p-8 rounded-xl bg-lightInputElementBgColor text-gray-500 dark:bg-darkInputElementBgColor">
                                        <ObjectDisplay object={pingResponse.ping_output}/>
                                    </div>
                                }

                                <div className="mt-3 w-full flex justify-between">

                                    <button className="h-8 w-25 bg-lightButton rounded-sm text-white max-h-[34px] flex justify-center items-center"
                                        onClick={() => {setMoreInfo(!moreInfo)}}
                                    >
                                        {moreInfo ? "Less Info":"More Info"}
                                    </button>

                                    <div></div>
                                    <button
                                        className="h-8 w-20 bg-red-600 rounded-sm text-white max-h-[34px] flex justify-center items-center"
                                        onClick={() => {
                                            setShowPopup(false);
                                            setPingResponse("");
                                            setValue("");
                                        }}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}

                    </PopupContainer>
                )
            }
        </>
    );
}

export default PingInput;