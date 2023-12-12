import { useContext, useEffect, useRef, useState } from "react";
import { ServerContext, StoreContext } from "../../App";
import Game from "../../modules/Game/Game";
import { Stars } from "@react-three/drei";
import Game_0 from "../../routes/GamePage";
import CollidersPositions from "./CollidersPositions";
import { Physics } from "@react-three/rapier";

const NewScene = () => {

   

    return (
        <group>
            <Physics colliders="hull" debug>
                <CollidersPositions/>
            </Physics>

            <Stars />
        </group>
    );
}

export default NewScene;