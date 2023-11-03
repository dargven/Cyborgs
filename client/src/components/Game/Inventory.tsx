import { Group, NearestFilter, Texture, TextureLoader, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";

interface IInventory {
    setWeapon: number,
    invRef: any,
}

interface IInventoryObject {
    [key: string]: Texture;
}

const Inventory = ({setWeapon, invRef}: IInventory) => {
    const textureLoader = new TextureLoader();
    const inventory = textureLoader.load('./assets/Inventory.png');
    const choosenSlot = textureLoader.load('./assets/СhoosenSlot.png');

    const slotPositions = [-0.47, 0, 0.47];
    const slotPos = slotPositions[setWeapon - 1] || 0;
    
    const [texture, setTexture] = useState<IInventoryObject>({
        'inv': inventory,
        'choosenSlot': choosenSlot,
    });
    
    inventory.magFilter = NearestFilter;
    inventory.minFilter = NearestFilter;

    return (
        <group ref={invRef}>
            <sprite scale={[1.5, 0.5, 0]}>
                <spriteMaterial map={texture['inv']} />
            </sprite>

            <sprite scale={[0.45, 0.4, 0]} position={[slotPos, 0, 0]}>
                <spriteMaterial map={texture['choosenSlot']} />
            </sprite>
        </group>
    )
}

export default Inventory;