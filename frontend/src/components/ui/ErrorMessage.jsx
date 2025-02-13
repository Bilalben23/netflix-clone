const ErrorMessage = ({ message }) => {
    return (
        <div className='py-10 text-sm flex items-center flex-col gap-y-2'>
            <img src="/assets/netflix-logo.png" alt="netflix-logo" className='w-20' />
            <p className='font-semibold text-lg'>Whoops! Something went wrong...</p>
            <p>Sorry, we're having trouble with your request. Please try again later.</p>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ErrorMessage;
