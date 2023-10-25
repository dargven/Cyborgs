import { Box, Sphere } from "@react-three/drei";
import { RigidBody, CuboidCollider,Physics,BallCollider } from "@react-three/rapier";

/*const MakeCollider = ({ size=[1, 1, 0.1], edgeWidth }: TMakeCollider) => {
    const [width, height, depth] = size;
    const edgeColor = 'red';
    const edges = new EdgesGeometry(new BoxGeometry(width, height, depth));
    const lineMaterial = new LineBasicMaterial({ color: edgeColor, linewidth: edgeWidth });
    const edgeLines = new LineSegments(edges, lineMaterial);*/

const MakeCollider  =  ()=>{
    
    return (
    <group position={[2, 5, -1]} rotation={[0,0,0]} >
        <Physics    gravity={[0, 0, 0]} >

         <RigidBody>
             <Box >
                <meshStandardMaterial color={0xff0000}></meshStandardMaterial>
            </Box>
             <CuboidCollider args={[1, 1, 0.1]} />
             
         </RigidBody>
         <RigidBody >
             
             <Sphere>
                <meshStandardMaterial color={0xffffff}></meshStandardMaterial>
            </Sphere>
             <BallCollider args={[0.5]} />
         </RigidBody>

         </Physics>
        </group>
       
    );
    }

        
export default MakeCollider;