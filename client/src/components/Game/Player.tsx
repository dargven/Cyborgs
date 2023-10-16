import MakeSprite from "./MakeSprite";
import { TROLLFACE } from "../../assets/images";
import { Vector3 } from "three";

const Player = () => {

    return (
        <mesh>
            <MakeSprite texture={TROLLFACE} position={new Vector3(2, 0.1, 2)} rotation={[Math.PI / 2, -Math.PI, Math.PI]} />
        </mesh>
    );
}

export default Player;