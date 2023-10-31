import { RigidBody, CuboidCollider } from "@react-three/rapier";

export interface IZone {

}
  
function Zone  ({ }: IZone)  {


    return (
        
            <RigidBody 
            userData={{
                type: "Zone"
            }}>
            <group position={[3,8,0.5]}>
             <CuboidCollider args={[1, 1, 0.5]} sensor
             onIntersectionEnter={(e) => {
                const data: any = e.other.rigidBody?.userData;
                if (data.type=="player") {
                    console.log("1")
                }
            }}
               ></CuboidCollider>
             </group>
            </RigidBody>
          
    )
}

export default Zone;
