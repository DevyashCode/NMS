import { useRef } from "react";

function PopupContainer({ className,handlePopupClose,children,closeOnOutsideClick=true }) {
    const modalRef = useRef();

    const closeRef = (e) => {
        if (modalRef.current === e.target) {
            handlePopupClose();
        }
    }

    return (
        <div ref={modalRef} className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50" onClick={closeOnOutsideClick && closeRef}>
            <div className={"flex flex-col bg-lightComponentBackground dark:bg-darkComponentBackground rounded-2xl shadow-md p-4 lg:px-8 pt-4 relative"+className}>
                {children}
            </div>
        </div>
    );
}

export default PopupContainer;

// h-[62%] lg:h-[60%] w-[90%] lg:w-[55%]