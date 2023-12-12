import { Stars } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { TextureLoader, Vector3 } from "three";
import CollidersPositions from "./CollidersPositions";
import Map from "./Map";
import MapObjects from "./MapObjects";
import FishTank from "./Fishtank";

const NewScene = () => {

    const textureLoader = new TextureLoader();
    const room = textureLoader.load('./assets/rooms/map-office-plain.png');
    const glass = textureLoader.load('./assets/Map parts/Glass.png');

    return (
        <group>
            <Physics colliders="hull" debug>
                <CollidersPositions />

                <ambientLight position={[0, 0, 0]} intensity={0.5} />

                <group scale={[81, 61, 1]} position={[0, 0, 0]}>
                    <Map texture={room} />
                </group>

                <MapObjects textures={glass} position={new Vector3(0, 0, 0.1)} />

                <FishTank />
            </Physics>

            <Stars />
        </group>
    );
}

export default NewScene;