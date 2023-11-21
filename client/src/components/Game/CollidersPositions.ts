import { Vector3 } from "three";
import Collider, { ICollider } from "../../modules/Game/entities/Collider";

const CollidersPositions = () => {
    const colliders: ICollider[] = [
        new Collider(new Vector3(-10.5, 24, 0), [13, 6.5, 0.5]),
        new Collider(new Vector3(-23, 4.5, 0), [0.5, 13, 0.5]),
        new Collider(new Vector3(-10, -13.5, 0), [13.5, 5, 0.5]),
        new Collider(new Vector3(14, -18, 0), [10.5, 0.5, 0.5]),
        new Collider(new Vector3(28.5, -11.5, 0), [4, 7, 0.5]),

        //stairs
        new Collider(new Vector3(-7, -8, 0), [2.5, 0.5, 0.5]),
        new Collider(new Vector3(-0.5, -7.5, 0), [4, 1, 0.5]),
        new Collider(new Vector3(-11, -5.5, 0), [1.5, 3, 0.5]),
        new Collider(new Vector3(-13, -3.5, 0), [0.5, 1, 0.5]),
        new Collider(new Vector3(-7, -4.5, 0), [0.5, 1, 0.5]),

        //office 
        new Collider(new Vector3(-16, 6, 0), [2.5, 0.5, 0.5]),
        new Collider(new Vector3(-22, 6.5, 0), [0.5, 1, 0.5]),
        new Collider(new Vector3(-8.5, 14, 0), [1, 0.5, 0.5]),
        new Collider(new Vector3(-8, 11, 0), [0.5, 0.5, 0.5]),

        new Collider(new Vector3(-22, 10, 0), [0.5, 0.5, 0.5]),
        new Collider(new Vector3(-18, 7, 0), [0.5, 0.5, 0.5]),
        new Collider(new Vector3(-18, 9.5, 0), [0.5, 1, 0.5]),
        new Collider(new Vector3(-21, 14, 0), [0.5, 0.5, 0.5]),
        new Collider(new Vector3(-15, 14, 0), [0.5, 0.5, 0.5]),

        //main hall
        new Collider(new Vector3(0, 7.5, 0), [3.5, 3, 0.5]),
        new Collider(new Vector3(-10.5, 7.5, 0), [3, 3, 0.5]),
        new Collider(new Vector3(0, 16, 0), [3.5, 1.5, 0.5]),
        new Collider(new Vector3(9.5, 15.5, 0), [2, 11, 0.5]),
        new Collider(new Vector3(-9, 16, 0), [1.5, 1.5, 0.5]),
        new Collider(new Vector3(3, 25, 0), [0.5, 1.5, 0.5]),
        new Collider(new Vector3(18.5, 0, 0), [3, 5.5, 0.5]),

        new Collider(new Vector3(-10, 0, 0), [3.5, 0.5, 0.5]),
        new Collider(new Vector3(-2.5, 0, 0), [2, 0.5, 0.5]),
        new Collider(new Vector3(9.5, 0, 0), [2, 0.5, 0.5]),
        new Collider(new Vector3(2, 0, 0), [0.5, 0.5, 0.5]),
        new Collider(new Vector3(5, 0, 0), [0.5, 0.5, 0.5]),
        new Collider(new Vector3(3.5, -3.5, 0), [8, 3, 0.5]),

        //tSpawn
        new Collider(new Vector3(23.5, 25.5, 0), [2, 1, 0.5]),
        new Collider(new Vector3(27, 26, 0), [1.5, 0.5, 0.5]),
        new Collider(new Vector3(15, 23.5, 0), [3.5, 3, 0.5]),
        new Collider(new Vector3(13, 30, 0), [10.5, 0.5, 0.5]),
        new Collider(new Vector3(26.5, 14, 0), [1, 0.5, 0.5]),
        new Collider(new Vector3(26.5, 10.5, 0), [1, 1, 0.5]),
        new Collider(new Vector3(20.5, 10, 0), [5, 0.5, 0.5]),
        new Collider(new Vector3(19, 25.5, 0), [0.5, 1, 0.5]),

        new Collider(new Vector3(28, 28.5, 0), [4.5, 2, 0.5]),
        new Collider(new Vector3(30.5, 22.5, 0), [2, 4, 0.5]),
        new Collider(new Vector3(18, 17.5, 0), [0.5, 1, 0.5]),
        new Collider(new Vector3(19, 17, 0), [0.5, 0.5, 0.5]),
        new Collider(new Vector3(19, 15, 0), [0.5, 0.5, 0.5]),

        //mid
        new Collider(new Vector3(12, 14, 0), [0.5, 0.5, 0.5]),
        new Collider(new Vector3(12.5, 15.5, 0), [1, 1, 0.5]),
        
        new Collider(new Vector3(15, 9.5, 0), [0.5, 1, 0.5]),
        new Collider(new Vector3(15, 5.5, 0), [0.5, 1, 0.5]),

        new Collider(new Vector3(13.5, 18.5, 0), [2, 2, 0.5]),

        //piper
        new Collider(new Vector3(26, 6, 0), [0.5, 3.5, 0.5]),

        //kitchen
        new Collider(new Vector3(25.5, 2, 0), [1, 0.5, 0.5]),
        new Collider(new Vector3(22, 2, 0), [0.5, 0.5, 0.5]),

        //projector
        new Collider(new Vector3(27, 1.5, 0), [0.5, 1, 0.5]),
        new Collider(new Vector3(31, 6, 0), [0.5, 3.5, 0.5]),
        new Collider(new Vector3(27, -2, 0), [0.5, 0.5, 0.5]),

        new Collider(new Vector3(29.5, -3.5, 0), [3, 1, 0.5]),

        new Collider(new Vector3(32, 6, 0), [0.5, 8.5, 0.5]),

        new Collider(new Vector3(29, 16.5, 0), [3.5, 2, 0.5]),

        //connector
        new Collider(new Vector3(4, 5, 0), [0.5, 0.5, 0.5]),
        new Collider(new Vector3(4, 10, 0), [0.5, 0.5, 0.5]),
        new Collider(new Vector3(7, 5, 0), [0.5, 0.5, 0.5]),
        new Collider(new Vector3(7, 10, 0), [0.5, 0.5, 0.5]),

        //garage stairs
        new Collider(new Vector3(9.5,-9, 0), [2, 0.5, 0.5]),

        new Collider(new Vector3(4.5, -10, 0), [1, 3.5, 0.5]),
        new Collider(new Vector3(8, -12, 0), [0.5, 2.5, 0.5]),
        
        new Collider(new Vector3(9, -14, 0), [0.5, 0.5, 0.5]),
        
        //outsideWindows
        new Collider(new Vector3(20, -7.5, 0), [1.5, 2, 0.5]),
        new Collider(new Vector3(23, -7.5, 0), [1.5, 3, 0.5]),
    ]
    
    return colliders;
}

export default CollidersPositions;