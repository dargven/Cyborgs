import { Group, NearestFilter, Texture, TextureLoader, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { IWeapons } from "./Scene";

interface IInventory {
    setWeapon: number;
    invRef: any;
    weapons: IWeapons;
}

interface IInventoryObject {
    [key: string]: Texture;
}

interface IGuns {
    [key: number]: {
        id: number;
        name: string;
        img: Texture;
    };
}



const Inventory = ({setWeapon, invRef, weapons}: IInventory) => {
    const textureLoader = new TextureLoader();
    const inventory = textureLoader.load('./assets/Inventory.png');
    const choosenSlot = textureLoader.load('./assets/ChoosenSlot.png');
    const AK47 = textureLoader.load('./assets/Skins/AK-47.png');
    const Butterfly = textureLoader.load('./assets/Skins/Butterfly.png');

    const slotPositions = [-0.47, 0, 0.47];
    const slotPos = slotPositions[setWeapon - 1] || 0;
    
    const [texture, setTexture] = useState<IInventoryObject>({
        'inv': inventory,
        'choosenSlot': choosenSlot,
        'AK-47': AK47,
        'Butterfly': Butterfly,
    });

   

    const guns: IGuns = {
        1: {
            id: 1,
            name: 'AK-47',
            img: texture['AK-47'],
        },
        2: {
            id: 2,
            name: 'Butterfly',
            img: texture['Butterfly'],
        },
    };

    inventory.magFilter = NearestFilter;
    inventory.minFilter = NearestFilter;

    const renderWeaponSlot = (slot: number, map: Texture) => {
        if (slot != null) {
            return( 
                <sprite scale={[0.45, 0.4, 0]} position={[slotPositions[slot-1], 0, 0]}>
                    <spriteMaterial map={map} />
                </sprite>
            )
        }
    }
    return (
        <group ref={invRef}>
            <sprite scale={[1.5, 0.5, 0]}>
                <spriteMaterial map={texture['inv']} />
            </sprite>
    
            <sprite scale={[0.45, 0.4, 0]} position={[slotPos, 0, 0]}>
                <spriteMaterial map={texture['choosenSlot']} />
            </sprite>

            {weapons.slot1 && 
                <sprite scale={[0.45, 0.4, 0]} position={[slotPositions[0], 0, 0]}>
                    <spriteMaterial map={guns[weapons.slot1].img} />
                </sprite>
            }
            {weapons.slot2 && 
                <sprite scale={[0.45, 0.4, 0]} position={[slotPositions[1], 0, 0]}>
                    <spriteMaterial map={guns[weapons.slot2].img} />
                </sprite>
            }
            {weapons.slot3 && 
                <sprite scale={[0.45, 0.4, 0]} position={[slotPositions[2], 0, 0]}>
                    <spriteMaterial map={guns[weapons.slot3].img} />
                </sprite>
            }
        </group>
    )
}

export default Inventory;