import { Animator } from "./sprites/Animator";

const  FishTank = () => {
    return (
        <group>
            <Animator
            scale={[0.8,2,0]}
            fps={5}
            loop={true}
            autoPlay={true}
            textureImageURL={'./assets/Map Parts/fishtank.png'}
            textureDataURL={'./assets/Map Parts/fishtank.json'}
            />
        </group>
    )
}

export default FishTank;