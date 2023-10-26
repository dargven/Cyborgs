import { RigidBody, CuboidCollider, Physics, BallCollider } from "@react-three/rapier";

interface IMakeCollider {
    isSphere?: boolean;
}

const MakeCollider = (props: IMakeCollider) => {

    return (
        <>
            {props.isSphere ?
                <RigidBody  >
                    <BallCollider args={[0.5]} />
                </RigidBody>
                :
                
                    <CuboidCollider args={[0.5, 0.5, 0.5]} />
                
            }
        </>
    );
}
export default MakeCollider;
