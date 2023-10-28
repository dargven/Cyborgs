import { RapierRigidBody, RigidBody, BallCollider } from "@react-three/rapier";
import { forwardRef, useState } from "react";
import HealthBar from "./HealthBar";
import { TextureLoader, Texture, Vector3 } from "three";
import { TROLLFACE, SADTROLLFACE } from "../../assets/images";

export interface IPlayerProps {
    id?: number;
    username?: string;
    hp?: number;
    position?: Vector3;
}

const Player = forwardRef((props: IPlayerProps, ref: React.Ref<RapierRigidBody>) => {
    const textureLoader = new TextureLoader();
    const TTROLLFACE = textureLoader.load(TROLLFACE);
    const TSADTROLLFACE = textureLoader.load(SADTROLLFACE);

    const [textures, setTextures] = useState<Texture[]>([TTROLLFACE, TSADTROLLFACE,]);

    return (
        <RigidBody
            ref={ref}
            scale={0.5}
            position={[-2, 0, 0]}
            colliders="hull"
            friction={0.5}
            linearDamping={0.9}
            angularDamping={1}
        >
            <BallCollider args={[0.5]} />
            <HealthBar />
        </RigidBody>
    );
});

export default Player;
