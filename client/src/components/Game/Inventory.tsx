import { Group, NearestFilter, Texture, TextureLoader, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";

interface IInventory {
    setWeapon: number
}

interface IInventoryObject {
    [key: string]: Texture;
}

const Inventory = ({setWeapon}: IInventory) => {
    const textureLoader = new TextureLoader();
    const inventory = textureLoader.load('./assets/Inventory.png');
    const choosenSlot = textureLoader.load('./assets/СhoosenSlot.png');

    let slotPos = 0;
    
    const [texture, setTexture] = useState<IInventoryObject>({
        'inv': inventory,
        'choosenSlot': choosenSlot,
    });
    
    inventory.magFilter = NearestFilter;
    inventory.minFilter = NearestFilter;
    
    const { camera } = useThree();
    
    const invRef = useRef<Group>(null);
    
    const positionToCamera = new Vector3(0, -2, -3);
    
    useFrame(() => {
        if (invRef.current) {
            invRef.current.position.copy(camera.position).add(positionToCamera);
        }
    });

    switch (setWeapon) {
        case 1:
            slotPos = -0.47
            break;
        case 2:
            slotPos = 0
            break;
        case 3:
            slotPos = 0.47
            break;
        default:
            break;
    }

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