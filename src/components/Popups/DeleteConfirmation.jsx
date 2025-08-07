import { MdDeleteOutline } from "react-icons/md";

function DeleteConfirmation({ id, setShowDeleteConfirmation, handleDeleteConfirmation }) {
    return (
        <div className="flex flex-col justify-center items-center px-8 py-6 bg-white dark:bg-darkComponentBackground rounded-2xl min-w-110 max-w-xs">
            {/* Centered Delete Icon */}
            <div className="flex justify-center items-center w-full mb-4">
                <MdDeleteOutline className="text-6xl text-red-500" />
            </div>
            <div className="text-lg font-semibold text-center mb-6 mt-2 dark:text-white">
                Are you sure you want to delete?
            </div>
            {/* Buttons */}
            <div className="flex gap-4 w-full justify-center">
                <button
                    className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
                    onClick={() => {
                        handleDeleteConfirmation(id);
                        setShowDeleteConfirmation(false);
                    }}
                >
                    Yes
                </button>
                <button
                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition"
                    onClick={() => {
                        setShowDeleteConfirmation(false);
                    }}
                >
                    No
                </button>
            </div>
        </div>
    );
}

export default DeleteConfirmation;
