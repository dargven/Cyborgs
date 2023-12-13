import { Stars } from "@react-three/drei";
import Player from "./Player";
import { Physics, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { TextureLoader, Vector3 } from "three";
import CollidersPositions from "./CollidersPositions";
import Map from "./Map";
import MapObjects from "./MapObjects";
import FishTank from "./Fishtank";
import Disabled from "./Disabled";
import { useContext, useEffect, useRef } from "react";
import { ServerContext, StoreContext } from "../../App";
import Game from "../../modules/Game/Game";

const NewScene = () => {

    const textureLoader = new TextureLoader();
    const room = textureLoader.load('./assets/rooms/map-office-plain.png');
    const glass = textureLoader.load('./assets/Map parts/Glass.png');

    const ref = useRef<RapierRigidBody>(null!);

    return (
        <group>
            <Physics colliders="hull" debug gravity={[0, 0, 0]}>
                <CollidersPositions />

                {/* <Player
                    token={""}
                    teamId={null}
                    hp={10}
                    x={0}
                    y={0}
                    vx={4}
                    vy={0}
                    dx={0}
                    dy={0} /> */}

                <Disabled
                    x={3}
                    y={3}
                    vx={-1}
                    vy={0}
                    dx={0}
                    dy={0}
                    token={"down"}
                    hp={100}
                    teamId={1}
                />

                <RigidBody
                    ref={ref}
                    scale={0.5}
                    position={[0, 0, 0]}
                    colliders="hull"
                    friction={1}
                    linearDamping={10}
                    angularDamping={1}
                    lockRotations
                    linearVelocity={[5, 0, 0]}
                ></RigidBody>

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