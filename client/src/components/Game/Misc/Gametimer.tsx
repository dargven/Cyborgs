import { useEffect, useState } from "react";
import { Text } from "@react-three/drei";
import { TMatch } from "../../../modules/Server/types";

const Timer = ({matchStart,matchEnd}:TMatch) => {

    const [counter, setCounter] = useState<number>(0);

    if (matchStart && matchEnd !== null) {
        const maxTime = parseInt(matchEnd) - parseInt(matchStart); 
        setCounter(maxTime); 
        return maxTime; 
    }
   

    useEffect(()=>{
        if (counter>0){
            setTimeout(()=>setCounter(counter-1),1000)
        }
    },[counter])

    return(
        <div>
            <Text fontSize={0.25}>
                {counter}
            </Text>
        </div>
    )
}

export default Timer;