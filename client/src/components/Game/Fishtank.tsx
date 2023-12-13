import { Animator } from "./Sprites/Animator"
import { RigidBody } from "@react-three/rapier";

const  FishTank = () => {
    return (
        <>
            <RigidBody>

                <Animator
                    position={[2,3,0]}
                    scale={[0.8,2,0]}
                    fps={5}
                    loop={true}
                    autoPlay={true}
                    textureImageURL={'./assets/Map Parts/fishtank.png'}
                    textureDataURL={'./assets/Map Parts/fishtank.json'}
            />

            </RigidBody>
        </>
    )
}

export default FishTank;