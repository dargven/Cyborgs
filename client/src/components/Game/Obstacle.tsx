import { RigidBody, CuboidCollider, RapierRigidBody } from "@react-three/rapier";
import { ICollider } from "../../modules/Game/entities/Collider";
import { useEffect, useRef, useState } from "react";
import MakeSprite from "./MakeSprite";

const Obstacle = ({ position, args, isDestructible, texture }: ICollider) => {

    const [isActive, setActive] = useState<boolean>(true);
    const ref = useRef<RapierRigidBody>(null!);

    return (
        <RigidBody
            ref={ref}
            type='fixed'
            userData={{
                type: "collider",
                isDestructible: isDestructible
            }}>
            {isActive &&
                <group>
                    <CuboidCollider
                        position={position}
                        args={args}
                        onIntersectionEnter={(e) => {
                            if (isDestructible) {

                                const data: any = e.other.rigidBody?.userData;
                                if (data.type === "projectile") {
                                    ref.current.setEnabled(false);
                                    setActive(false);
                                }
                            }
                        }}
                    />
                    {texture &&
                        <MakeSprite texture={texture} position={position} />
                    }
                </group>
            }
        </RigidBody>
    );

}

export default Obstacle;