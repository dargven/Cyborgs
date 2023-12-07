import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import MakeSprite from "./MakeSprite";

const LoadingScreen = () => {
    const robot = useLoader(TextureLoader, './assets/image/Robot_favikon.png');
    return(
        <group position={[0,0,1]}>
            <MakeSprite texture={robot}/>
        </group>
    )
}

export default LoadingScreen;