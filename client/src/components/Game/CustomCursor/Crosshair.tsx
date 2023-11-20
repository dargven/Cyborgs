import { TextureLoader } from "three";
import useMousePosition from "./MousePos"
import MakeSprite from "../MakeSprite";

const CrossHair = () =>{
    const {x,y} = useMousePosition();
    const textureLoader = new TextureLoader();
    const CursorTexture = textureLoader.load('./assets/crosshair.png')
    
    return (
        <group position={[x,y,0.5]}>
          <MakeSprite texture={CursorTexture}/>
        </group>
    );
};
export default CrossHair