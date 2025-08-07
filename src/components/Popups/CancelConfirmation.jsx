import { CgCloseO } from "react-icons/cg";

function CancelConfirmation({ setShowConfirmation, setShowCancelConfirmation,handlePopupClose }) {
  return (
    <div className="flex flex-col justify-center items-center px-8 py-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg min-w-110 max-w-xs">
      {/* Centered Cancel Icon */}
      <div className="flex justify-center items-center w-full mb-4">
        <CgCloseO className="text-6xl text-red-500" />
      </div>
      <div className="text-lg font-semibold text-center mb-6 mt-2">
        Are you sure you want to cancel?
      </div>
      {/* Buttons */}
      <div className="flex gap-4 w-full justify-center">
        <button
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
          onClick={()=>{handlePopupClose()}}
        >
          Yes
        </button>
        <button
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition"
          onClick={()=>{
            setShowConfirmation(false);
            setShowCancelConfirmation(false);
        }}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default CancelConfirmation;
