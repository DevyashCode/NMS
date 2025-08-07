function ConfirmationContainer({className,children}) {
    return (
        <div className={"fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"+className}>
            {children}
        </div>
    );
}

export default ConfirmationContainer;