import { ButtonHTMLAttributes } from 'react';
//import Spinner from '../Spinner';

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    loadingText?: string;
}

const LoadingButton = (props: LoadingButtonProps) => {
    return (
        <button
            className="transition-colors bg-violet-600 text-white font-medium px-4 py-2 rounded-md hover:bg-violet-700 disabled:bg-violet-400"
            disabled={props.loading || props.disabled}
            {...props}
        >
            {props.loading ? (
                props.loadingText ? (
                    props.loadingText
                ) : (
                    <div className="w-full flex items-center justify-center">
                        {/* <Spinner theme="dark" /> */}
                    </div>
                )
            ) : (
                props.children
            )}
        </button>
    );
};

export default LoadingButton;
