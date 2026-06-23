interface LoaderType {
    message?: string,
    showLoader?: boolean
};

const Loader = ( { message, showLoader }: LoaderType) => {
    return (

        <div className="self-center">
            <div className={`flex items-end justify-center ${!showLoader ? 'hidden' : 'display' }`}>
                <span className="flex absolute h-20 w-20 -mt-1 -mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-600 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-20 w-20 bg-gray-300"></span>
                </span>
            </div>
            <div className="flex justify-center ">
                <p className="text-center text-lg font-sans text-gray-600">{message || 'Authenticating, please wait.'}</p>
            </div>
        </div>

    );
};

export default Loader;