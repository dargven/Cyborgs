import { useState } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { Vector3 } from "three/src/math/Vector3";
import HealthBar from "./HealthBar";
import MakeSprite from "./MakeSprite";

interface IPRobotStats {
    position?: Vector3;
}

const Robot = ({ position }: IPRobotStats) => {
    const [hp, setHp] = useState<number>(100);

    const textureLoader = new TextureLoader();
    const TRobotTexture = textureLoader.load('client/public/assets/Skins/Robot.png');

    return (
        <group>
            <MakeSprite texture={TRobotTexture} />
            <HealthBar value={hp} color={0x00ff00} />
        </group>
    );
}

export default Robot;