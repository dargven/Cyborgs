import { useContext, useEffect, useRef } from "react";
import { ServerContext, StoreContext } from "../../App";
import Game from "../../modules/Game/Game";
import { Stars } from "@react-three/drei";

const NewScene = () => {

    const server = useContext(ServerContext);
    const store = useContext(StoreContext);

    const game = useRef<Game>(new Game(server, store));

    useEffect(()=>{
        // useGame что-то такое тут должно быть
    },);

    return (
        <group>
            {/* мапа
            игроки
            пули
            и т.д. */}
            <Stars />
        </group>
    );
}

export default NewScene;