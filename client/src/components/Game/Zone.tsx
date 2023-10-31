import { RigidBody, CuboidCollider } from "@react-three/rapier";
import React from 'react';
import { useState, useEffect } from 'react';

export interface IZone {

}

/*if (Date.now() - lastShoot.current > FIRE_RATE) {
    lastShoot.current = Date.now();
    const newBullet = {
      id: state.id + "-" + +new Date(),
      position: vec3(rigidbody.current.translation()),
      angle,
      player: state.id,
    };*/

function Zone  ({ }: IZone)  {

    const [time, setTime]=useState<number>(0);

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
                   setTime (Date.now())
                }
            }}
            onIntersectionExit={(e) => {
                const data: any = e.other.rigidBody?.userData;
                if (data.type=="player") {
                    const left= Date.now()
                    const score= Math.floor((left - time)/1000)
                    // console.log(score)
                }
            }}
               ></CuboidCollider>
             </group>
            </RigidBody>
          
    )
}

export default Zone;