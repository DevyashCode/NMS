import React from "react";

function ResetConfirmation({ setShowConfirmation, setShowResetConfirmation, handleResetConfirmation }) {
    return (
        <div className="bg-white dark:bg-darkComponentBackground rounded-xl p-6 w-110 max-w-full text-center">
            {/* Reset symbol */}
            <div className="text-green-600 dark:text-green-400 text-6xl mb-4 select-none">
                &#128260; {/* Unicode for "Clockwise Open Circle Arrow" (Reset/Reload) */}
            </div>

            {/* Message */}
            <p className="mb-6 text-lg text-gray-900 dark:text-gray-200">
                Are you sure you want to Reset?
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => {
                        handleResetConfirmation();
                        setShowConfirmation(false);
                        setShowResetConfirmation(false);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                    Yes
                </button>
                <button
                    onClick={() => {
                        setShowConfirmation(false);
                        setShowResetConfirmation(false);
                    }}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                >
                    No
                </button>
            </div>
        </div>
    );
}

export default ResetConfirmation;
