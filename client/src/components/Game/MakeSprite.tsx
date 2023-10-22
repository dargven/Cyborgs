import { MeshStandardMaterial, PlaneGeometry, DoubleSide } from "three";
import { TSprite } from "./Types";
import MakeCollider from "./MakeCollider";
import * as THREE from "three";

const MakeSprite = ({ texture, position, scale=1, isCollider=true, colliderSize=[1, 1, 0.1] }: TSprite) => {

    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;

    const planeGeometry = new PlaneGeometry(1, 1);
    const planeMaterial = new MeshStandardMaterial({ map: texture, transparent: true, side: DoubleSide});

    return(
        <mesh position={position} scale={[scale, scale, scale]} >
            <meshStandardMaterial side={DoubleSide} map={texture} transparent />
            <primitive object={planeGeometry} material={planeMaterial} />
            {isCollider ? <MakeCollider edgeWidth={10} size={colliderSize}/> : null}
        </mesh>
    )
}

export default MakeSprite;