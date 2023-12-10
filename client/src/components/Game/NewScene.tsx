import { useContext, useEffect, useRef, useState } from "react";
import { ServerContext, StoreContext } from "../../App";
import Game from "../../modules/Game/Game";
import { Stars } from "@react-three/drei";
import Game_0 from "./Game";

const NewScene = () => {

    const [team,setTeam] = useState<number>(null!)

    return (
        <group>
            {team !== null ? (
                <Game_0/>
            ) : (
                <>
                    <button onClick={() => setTeam(0)} className="Team1">
                        команда 1
                    </button>
                    <button onClick={() => setTeam(1)} className="Team2">
                        команда 2
                    </button>
                </>
            )}
            <Stars />
        </group>
    );
}

export default NewScene;