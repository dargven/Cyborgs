import './loading.css';

const LoadingScreen = () => {
    return(
        <div className="loading-container">
            <div className="centered-score">
                <img className='robot-loading' src="/assets/image/Robot_favikon.png" alt="Loading Robot" />
            </div>
            <div className="overlay"></div>
        </div>
    )
}

export default LoadingScreen;