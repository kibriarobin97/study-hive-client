import { RotatingLines } from "react-loader-spinner";


const LoadingSpinner = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-184px)]">
            <RotatingLines
                visible={true}
                height="60"
                width="60"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default LoadingSpinner;