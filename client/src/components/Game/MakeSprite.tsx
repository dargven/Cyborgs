import { TextureLoader, MeshBasicMaterial, PlaneGeometry, DoubleSide } from "three";
import { TSprite } from "./Types";

const MakeSprite = ({ texture, position, scale=1 }: TSprite) => {
    const textureLoader = new TextureLoader();
    const spriteTexture = textureLoader.load(texture);

    const planeGeometry = new PlaneGeometry(1, 1);
    const planeMaterial = new MeshBasicMaterial({ map: spriteTexture, transparent: true, side: DoubleSide});

    return(
        <mesh position={position} scale={[scale, scale, scale]} rotation={[Math.PI, 0, 0]}>
            <primitive object={planeGeometry} material={planeMaterial} />
            <meshBasicMaterial side={DoubleSide} map={spriteTexture} transparent />
        </mesh>
    )
}

export default MakeSprite;