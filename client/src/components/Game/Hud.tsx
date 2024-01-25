import Debug from "./Misc/DebugInfo";
import { TMatch, TPlayer } from "../../modules/Server/types";
import GameTimer from "./Misc/Gametimer";

interface IHud {
    hudRef: any;
    player: TPlayer;
    match: TMatch | null;
}

const Hud = ({ hudRef, player, match }: IHud) => {

    return (
        <group ref={hudRef}>
            <group position={[0, 4, 0]}>
                <Debug player={player} />
            </group>
            <group position={[0, 3.7, 0]} >
                <GameTimer match={match} />
            </group>
        </group>
    )
}

export default Hud;