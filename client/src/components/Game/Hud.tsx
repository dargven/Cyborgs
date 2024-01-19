import Debug from "./Misc/DebugInfo";
import { TPlayer } from "../../modules/Server/types";
// import Timer from "./Misc/Gametimer";

interface IHud {
    hudRef: any;
    player: TPlayer;
}

const Hud = ({hudRef, player}: IHud) => {



    return (
        <group ref={hudRef}>
            <group position={[0,4,0]}>
                <Debug player={player}></Debug>
            </group>
            {/* <group position={[0,3.7,0]} >
                <Timer isMatchEnd = {false}></Timer>
            </group> */}
        </group>
    )
}

export default Hud;