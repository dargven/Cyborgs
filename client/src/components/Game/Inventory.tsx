import { Group, NearestFilter, Texture, TextureLoader, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";

interface IInventoryProps {
    value: object;
}

interface IInventoryObject {
    [key: string]: Texture;
}

const Inventory = () => {
    const textureLoader = new TextureLoader();
    const inventory = textureLoader.load('./assets/Inventory.png');

    
    const [texture, setTexture] = useState<IInventoryObject>({
        'inv': inventory,
    });
    
    
    const { camera } = useThree();
    
    const invRef = useRef<Group>(null);
    
    const positionToCamera = new Vector3(-8, -7, -3);
    
    useFrame(() => {
        if (invRef.current) {
            invRef.current.position.copy(camera.position).add(positionToCamera);
        }
    });
    
    inventory.magFilter = NearestFilter;
    inventory.minFilter = NearestFilter;
    
    return (
        <group ref={invRef}>
            <sprite scale={[1.5, 0.5, 0]}>
                <spriteMaterial map={texture['inv']} />
            </sprite>
        </group>
    )
}

export default Inventory;