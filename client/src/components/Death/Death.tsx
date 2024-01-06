import { useEffect, useState } from "react";

const Death=()=>{
    const [timer, setTimer] = useState(5);
    const [deathButton, setDeathButton]=useState({
        timeout: false,
        isButtonDisabled:false
})
    const startTimer = () => {
        setDeathButton((prevState) => ({
            ...prevState,
            timeout: true,
            isButtonDisabled: true,
        }));

        let seconds = 5;

        const interval = setInterval(() => {
            setTimer(seconds);
            seconds--;

            if (seconds < 0) {
                clearInterval(interval);
                setDeathButton((prevState) => ({
                    ...prevState,
                    timeout: false,
                    isButtonDisabled: false,
                }));
            }
        }, 1000);
    };

    useEffect(() => {
        startTimer();
    }, []);
return(
    <>
        <div>ты был убит
            <div>твой убийца</div>
        </div>
        <div>2
            <div>
                убийств ?
            </div>
            <div>
                 урон ?
            </div>
            <div>
                смертей ?
            </div>
        </div>
        {deathButton.timeout && (
                                <div className="timeout">
                                     {timer}
                                </div>
                            )}
        <button onClick={ ()=>startTimer()}
        disabled={deathButton.isButtonDisabled}
        >возродится</button>

    
    </>
)

}
export default Death