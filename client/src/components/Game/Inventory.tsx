import { Group, NearestFilter, Texture, TextureLoader, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";

interface IInventory {
    setWeapon: number;
    invRef: any;
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

interface IWeapons {
    [key: string]: number | null;
}

const Inventory = ({setWeapon, invRef}: IInventory) => {
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

    const [weapons, setWeapons] = useState<IWeapons>({
        slot1: 1,
        slot2: 2,
        slot3: null,
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

            {Object.keys(weapons).map(slotName => (
                weapons[slotName] != null ?
                    renderWeaponSlot(
                        weapons[slotName]!,
                        guns[weapons[slotName]!].img
                    )
                :
                null
            ))}
        </group>
    )
}

export default Inventory;