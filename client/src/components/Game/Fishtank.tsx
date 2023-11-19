import { Animator } from "./sprites/Animator"
import { RigidBody } from "@react-three/rapier";

const FishTank = () => {
    return (
        <>
            <RigidBody>

                <Animator
                    position={[2, 3, 0]}
                    scale={[1, 3, 0]}
                    fps={5}
                    loop={true}
                    autoPlay={true}
                    textureImageURL={'./assets/Map Parts/fishtank.png'}
                    textureDataURL={'./assets/Map Parts/fishtank.json'}
                    materialRotation={Math.PI / 2}
                />

            </RigidBody>
        </>
    )
}

export default FishTank;