const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="flex flex-col items-center gap-4">
                {/* Spinner */}
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
                </div>

                {/* Text */}
                <p className="text-sm text-gray-500 tracking-wide">
                    Loading...
                </p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
