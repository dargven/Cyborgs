import { useEffect, useState } from "react";
import { Text } from "@react-three/drei";

interface ITimer {
    maxTime: number,
}


const Timer = ({maxTime}:ITimer) => {
    const [counter, setCounter] = useState(maxTime)
    
    useEffect(()=>{
        if (counter>0){
            setTimeout(()=>setCounter(counter-1),1000)
        }
    },[counter])

    return(
        <Text fontSize={0.25}>
            {counter}
        </Text>
    )
}

export default Timer;