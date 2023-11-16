import { Texture, Vector3 } from "three";
import { CuboidArgs, CuboidCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import MakeSprite from "./MakeSprite";
import { useState, useRef } from "react";

type TLoot = 'item' | 'ammo' | 'gun' | 'cosmetics' | 'misc';

interface ILootProps {
    type: TLoot;
    position: Vector3;
    args: CuboidArgs;
    texture: Texture;
}

const Loot = ({ position, args = [0.25, 0.25, 0.25], type, texture }: ILootProps) => {

    const [isActive, setActive] = useState<boolean>(true);
    const ref = useRef<RapierRigidBody>(null!);

    return (
        <group>
            <RigidBody
                ref={ref}
                type='fixed'
                userData={{
                    type: "loot",
                }}>
                {isActive &&
                    <group>
                        <CuboidCollider
                            position={position}
                            args={args}
                            onIntersectionEnter={(e) => {
                                const data: any = e.other.rigidBody?.userData;
                                if (data.type === "player") {
                                    ref.current.setEnabled(false);
                                    setActive(false);
                                }
                            }}
                        />
                        {texture &&
                            <MakeSprite texture={texture} position={position} />
                        }
                    </group>
                }
            </RigidBody>
        </group>
    )
}

export default Loot;