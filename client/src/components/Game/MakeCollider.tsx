import { Box, Sphere } from "@react-three/drei";
import { RigidBody, CuboidCollider,Physics,BallCollider } from "@react-three/rapier";
import {Suspense} from "react"


interface IMakeCollider{
    isSphere?:boolean;
}

const MakeCollider  =  (props:IMakeCollider)=>{
    
    return (
    
        <Suspense>
        <Physics    gravity={[0, 0, 0]} colliders="hull" >
        
        {props.isSphere ? 
        
        <RigidBody type="fixed">
            <Sphere args={[0.4]}>
            <meshStandardMaterial color={0xffffff}></meshStandardMaterial>
            </Sphere>
            
            
        <BallCollider args={[0.4]}  />
        </RigidBody>
        
            :
            
        <RigidBody type="fixed" >
            <Box >
            <meshStandardMaterial color={0xff0000}></meshStandardMaterial>
            </Box>
           
            <CuboidCollider args={[1, 1, 1]} />
        </RigidBody>
     
        }
        
         </Physics>
         </Suspense>
      
       
    );
    }

        
export default MakeCollider;
/*<RigidBody
          ref={body}
          colliders="ball"
          restitution={0.2}
          friction={0}
          position={[0, 1, 0]}
          linearDamping={0.2}
          angularDamping={0.2}
        >*/