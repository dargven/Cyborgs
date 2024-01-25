import { useEffect, useState } from "react";
import { Text } from "@react-three/drei";
import { TMatch } from "../../../modules/Server/types";

interface TGameTimer {
    match: TMatch;
}

const GameTimer = ({ match }: TGameTimer) => {

    const [counter, setCounter] = useState<number>(0);
    const time = Date.now();

    useEffect(() => {
        if (match && match.matchStart && match.matchEnd) {
            const maxTime = Math.floor((parseInt(match.matchEnd) - time) / 1000);

            if (maxTime > 0 && counter >= 0) {
                setCounter(maxTime);

                const intervalId = setInterval(() => {
                    setCounter((prevCounter) => prevCounter - 1);
                }, 1000);

                return () => clearInterval(intervalId);
            }
        }
    }, [match]);

    return (
        <Text fontSize={0.25}>
            {counter}
        </Text>
    )
}

export default GameTimer;