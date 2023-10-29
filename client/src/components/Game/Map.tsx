import React, { useEffect, useState } from "react";
import { Vector3 } from "three";
import MakeSprite from "./MakeSprite";
import { TextureLoader } from "three";
import { FL, WALL, LUC, RUC, LDC, RDC, COL, TEST, No_Texture, Space } from "../../assets/images";
import { useTexture } from "@react-three/drei";
import Room from "./Room";

interface IMap {
    scale?: number
}
//0-пустота
//1-пол
//2-стена
function Map({ scale }: IMap) {
    const SideHall = [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2,],
    ];

    const Long = [
        [2, 2, 2, 2, 2, 2, 2,],
        [2, 1, 1, 1, 1, 1, 1,],
        [2, 1, 1, 1, 1, 1, 1,],
        [2, 1, 1, 1, 1, 1, 1,],
        [2, 2, 1, 1, 1, 1, 2,],
        [0, 2, 1, 1, 1, 1, 2,],
        [2, 2, 1, 1, 1, 1, 2,],
        [2, 1, 1, 1, 1, 1, 2,],
        [2, 1, 1, 1, 1, 1, 2,],
        [2, 1, 1, 1, 1, 1, 2,],
        [2, 1, 1, 1, 1, 1, 2,],
        [2, 1, 1, 1, 1, 1, 2,],
        [2, 1, 1, 1, 1, 1, 2,],
        [2, 2, 1, 1, 1, 1, 2,],
        [0, 2, 1, 1, 1, 1, 2,],
    ];

    const TSpawn = [
        [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2,],
        [2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2,],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,],
        [2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2,],
    ];

    const FrontHall = [
        [2, 2, 1, 1, 1, 1, 2,],
        [1, 1, 1, 1, 1, 1, 2,],
        [1, 1, 1, 1, 1, 1, 2,],
        [1, 1, 1, 1, 1, 1, 2,],
        [1, 1, 1, 1, 1, 1, 2,],
        [2, 2, 1, 1, 1, 2, 2,],
    ]

    const Connector = [
        [2, 2, 1, 1, 1, 1, 2,],
        [1, 1, 1, 1, 1, 1, 2,],
        [1, 1, 1, 1, 1, 1, 2,],
        [1, 1, 1, 1, 1, 1, 2,],
        [1, 1, 1, 1, 1, 1, 2,],
        [2, 2, 1, 1, 1, 2, 2,],
    ]

    return (
        <>
            <group position={[5, 6, 0]}>
                <Room map={TSpawn} scale={scale}/>
            </group>
            <group position={[-5, 10, 0]}>
                <Room map={SideHall} scale={scale}/>
            </group>
            <group position={[-12, 10, 0]}>
                <Room map={Long} scale={scale}/>
            </group>
            <group position={[-12, -5, 0]}>
                <Room map={FrontHall} scale={scale}/>
            </group>
            <group position={[-12, -11, 0]}>
                <Room map={Connector} scale={scale}/>
            </group>
        </>
    )
}

export default Map;