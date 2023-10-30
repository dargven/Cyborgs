import React from "react";
import { Color, ColorRepresentation, PointLight, Vector3 } from "three";
import { IPlayerProps } from "./Player";


interface ILightProps {
    position: Vector3,
    intensity?: Number,
    decay?: Number,
    distance?: Number
    color?: ColorRepresentation,
    castshadow?: boolean
}


const Light = ((props: ILightProps) => {
    return(
        <>
        <pointLight position={[0, 20, 10]} intensity={3} color = {'#ffffff'} />
        <mesh rotation={[0, 10, 0]}>
          <boxGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" color={"#6be092"} />
        </mesh>
        </>
    );
});

export default Light;