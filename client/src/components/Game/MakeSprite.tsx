import { TextureLoader, MeshBasicMaterial, PlaneGeometry, DoubleSide } from "three";
import { TSprite } from "./Types";
import MakeCollider from "./MakeCollider";

const MakeSprite = ({ texture, position, scale=1, rotation=[Math.PI, 0, 0], isCollider=true, colliderSize=[1, 1, 0.1] }: TSprite) => {
    const textureLoader = new TextureLoader();
    const spriteTexture = textureLoader.load(texture);

    const planeGeometry = new PlaneGeometry(1, 1);
    const planeMaterial = new MeshBasicMaterial({ map: spriteTexture, transparent: true, side: DoubleSide});

    return(
        <mesh position={position} scale={[scale, scale, scale]} rotation={rotation}>
            <meshBasicMaterial side={DoubleSide} map={spriteTexture} transparent />
            <primitive object={planeGeometry} material={planeMaterial} />
            {isCollider ? <MakeCollider edgeWidth={10} size={colliderSize}/> : null}
        </mesh>
    )
}

export default MakeSprite;