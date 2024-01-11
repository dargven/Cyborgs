import { useEffect, useState } from "react";
 import "./Death.css";

const Death = () => {
    const [timer, setTimer] = useState(5);
    const [deathButton, setDeathButton] = useState({
        timeout: false,
        isButtonDisabled: false
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
    return (
        <>
            <div className="pageWrapper">
                <div className="pageTitle">ты был убит
                    <div>твой убийца</div>
                </div>
                <div className="container_death">
                   2
                    <div className="centered">
                        
                        <div className="block">
                            убийств ?
                        </div>
                        <div className="block">
                            урон ?
                        </div>
                        <div className="block">
                            смертей ?
                        </div>
                    </div>
                </div>
                {deathButton.timeout && (
                    <div className="timeout">
                        {timer}
                    </div>
                )}
                <button className="Next" onClick={() => startTimer()}
                    disabled={deathButton.isButtonDisabled}
                >возродится</button>
            </div>

        </>
    )

}
export default Death