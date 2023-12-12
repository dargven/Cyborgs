import { useContext, useEffect, useRef, useState } from "react";
import { ServerContext, StoreContext } from "../../App";
import Game from "../../modules/Game/Game";
import { Stars } from "@react-three/drei";
import Game_0 from "../../routes/GamePage";

const NewScene = () => {

   

    return (
        <group>



            <Stars />
        </group>
    );
}

export default NewScene;