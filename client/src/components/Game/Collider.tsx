import { RigidBody, CuboidCollider, RapierRigidBody } from "@react-three/rapier";
import { ICollider } from "../../modules/Game/entities/Collider";

const Collider = ({ position, args, isDestroyable }: ICollider) => {
    return (
        <RigidBody
            type='fixed'
            userData={{
                type: "Collider",
                isDestroyable: isDestroyable
            }}>
            <CuboidCollider
                position={position}
                args={args}
            />
        </RigidBody>
    );

}

export default Collider;