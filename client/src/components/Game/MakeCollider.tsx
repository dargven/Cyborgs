import { RigidBody, CuboidCollider, Physics, BallCollider } from "@react-three/rapier";

interface IMakeCollider {
    isSphere?: boolean;
}

const MakeCollider = (props: IMakeCollider) => {

    return (
        <>
            {props.isSphere ?
                <RigidBody  >
                    <BallCollider args={[1]} />
                </RigidBody>
                :
                <RigidBody type="fixed" >
                    <CuboidCollider args={[1, 1, 1]} />
                </RigidBody>
            }
        </>
    );
}
export default MakeCollider;
