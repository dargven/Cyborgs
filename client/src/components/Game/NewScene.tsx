import { useContext, useEffect, useRef, useState } from "react";
import { ServerContext, StoreContext } from "../../App";
import Game from "../../modules/Game/Game";
import { Stars } from "@react-three/drei";
import Game_0 from "../../routes/GamePage";
import CollidersPositions from "./CollidersPositions";
import { Physics } from "@react-three/rapier";
import Map from "./Map";
import { TextureLoader, Vector3 } from "three";
import MapObjects from "./MapObjects";

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
            </Physics>

            <Stars />
        </group>
    );
}

export default NewScene;