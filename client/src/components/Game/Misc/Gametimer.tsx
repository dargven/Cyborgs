import { useEffect, useState } from "react";
import { TPlayer } from "../../../modules/Server/types";

interface ITimer {
    maxTime: number,
    timerRef: any,
}


const Timer = ({maxTime,timerRef}:ITimer) => {
    const [counter, setCounter] = useState(maxTime)
    
    useEffect(()=>{
        if (counter>0){
            setTimeout(()=>setCounter(counter-1),1000)
        }
    },[counter])

    return(
        <group ref={timerRef}>
            {counter}
        </group>
    )
}

export default Timer;