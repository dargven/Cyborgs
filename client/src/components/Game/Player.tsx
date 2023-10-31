import { RapierRigidBody, RigidBody, BallCollider } from "@react-three/rapier";
import { forwardRef, useState } from "react";
import HealthBar from "./HealthBar";
import { TextureLoader, Texture, Vector3 } from "three";
import { TROLLFACE, SADTROLLFACE } from "../../assets/images";
import { SpriteAnimator } from "@react-three/drei";

export interface IPlayerProps {
    id?: number;
    username?: string;
    hp?: number;
    position?: Vector3;
}

const Player = forwardRef((props: IPlayerProps, ref: React.Ref<RapierRigidBody>) => {

    const [hp, setHp] = useState<number>(100);

    const textureLoader = new TextureLoader();
    const TTROLLFACE = textureLoader.load(TROLLFACE);
    const TSADTROLLFACE = textureLoader.load(SADTROLLFACE);

    const data = {
        type: 'player'
    }

    const [textures, setTextures] = useState<Texture[]>([TTROLLFACE, TSADTROLLFACE,]);

    return (
        <RigidBody
            ref={ref}
            scale={0.5}
            position={[-2, 0, 0]}
            colliders="hull"
            friction={1}
            linearDamping={10}
            angularDamping={1}
            lockRotations
            userData={data}
        >
            <SpriteAnimator
                fps={40}
                startFrame={0}
                autoPlay={true}
                loop={true}
                textureImageURL={'./assets/test/Sprite-0001.png'}
                textureDataURL={'./assets/test/Sprite-0001.json'}
                alphaTest={0.01}
            //onStart={} две функции старта рендера и конца 
            //onEnd={}
            />

            <BallCollider args={[0.5]} restitution={0}
                onIntersectionEnter={(e) => {

                    const data: any = e.other.rigidBody?.userData;
                    if (data.type == "projectile") {
                        if (hp - 10 < 0) {
                            setHp(0)
                        }
                        else {
                            setHp(hp - 10)
                        }
                    }
                }} />
            <HealthBar value={hp} color={0xff0000} />
        </RigidBody>
    );
});

export default Player;
