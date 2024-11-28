const NotificationOrder = ({successMessage,bg}) => {
    return (
        <div className="flex fixed top-0 left-0 w-screen h-screen justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="relative z-10 w-4/5 max-w-md p-3 pb-0 bg-white shadow-lg rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">Thông báo</h3>
                <div className={`flex justify-center alert bg-${bg}-500 mb-3`}>
                    {successMessage}
                </div>
            </div>
        </div>
    );
}

export default NotificationOrder;