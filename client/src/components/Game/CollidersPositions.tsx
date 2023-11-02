import { Vector3 } from "three";
import MapCollider, { ICollider } from "../../components/Game/Colliders";


const CollidersPositions = () => {
    const colliders: ICollider[] = [
        //stairs
        new MapCollider(new Vector3(-4, -4, 0), [0.5, 3.5, 0.5]),
        new MapCollider(new Vector3(-7, -8, 0), [3.5, 0.5, 0.5]),
        new MapCollider(new Vector3(-10, -5, 0), [0.5, 2.5, 0.5]),
        new MapCollider(new Vector3(-7, -4.5, 0), [0.5, 1, 0.5]),
        new MapCollider(new Vector3(-11.5, -3, 0), [1, 0.5, 0.5]),
        new MapCollider(new Vector3(-13, -3.5, 0), [0.5, 1, 0.5]),

        //office
        new MapCollider(new Vector3(-16, 18, 0), [12.5, 0.5, 0.5]),
        new MapCollider(new Vector3(-16, 6, 0), [2.5, 0.5, 0.5]),
        new MapCollider(new Vector3(-25, 6, 0), [3.5, 0.5, 0.5]),
        new MapCollider(new Vector3(-27.5, 10, 0), [1, 0.5, 0.5]),
        new MapCollider(new Vector3(-27.5, 14, 0), [1, 0.5, 0.5]),
        new MapCollider(new Vector3(-8.5, 14, 0), [1, 0.5, 0.5]),
        new MapCollider(new Vector3(-8, 11, 0), [0.5, 0.5, 0.5]),
        
        new MapCollider(new Vector3(-22, 7, 0), [0.5, 0.5, 0.5]),
        new MapCollider(new Vector3(-22, 10, 0), [0.5, 0.5, 0.5]),
        new MapCollider(new Vector3(-18, 7, 0), [0.5, 0.5, 0.5]),
        new MapCollider(new Vector3(-18, 9.5, 0), [0.5, 1, 0.5]),
        new MapCollider(new Vector3(-28, 8, 0), [0.5, 1.5, 0.5]),
        new MapCollider(new Vector3(-21, 14, 0), [0.5, 0.5, 0.5]),
        new MapCollider(new Vector3(-15, 14, 0), [0.5, 0.5, 0.5]),
        //main hall

        new MapCollider(new Vector3(0, 7.5, 0), [3.5, 3, 0.5]),
        new MapCollider(new Vector3(-10.5, 7.5, 0), [3, 3, 0.5]),
        new MapCollider(new Vector3(0, 16, 0), [3.5, 1.5, 0.5]),
        new MapCollider(new Vector3(9.5, 9, 0), [2, 4.5, 0.5]),
        new MapCollider(new Vector3(-9, 16, 0), [1.5, 1.5, 0.5]),
        new MapCollider(new Vector3(8, 20, 0), [0.5, 6.5, 0.5]),
        new MapCollider(new Vector3(2, 20.5, 0), [0.5, 3, 0.5]),
        new MapCollider(new Vector3(3, 25, 0), [0.5, 1.5, 0.5]),
        new MapCollider(new Vector3(2, 28, 0), [0.5, 1.5, 0.5]),
        new MapCollider(new Vector3(18.5, 0, 0), [3, 5.5, 0.5]),
        
        new MapCollider(new Vector3(-10, 0, 0), [3.5, 0.5, 0.5]),
        new MapCollider(new Vector3(-2.5, 0, 0), [2, 0.5, 0.5]),
        new MapCollider(new Vector3(0.5, -1, 0), [1, 0.5, 0.5]),
        new MapCollider(new Vector3(2, 0, 0), [0.5, 0.5, 0.5]),
        new MapCollider(new Vector3(3.5, -1, 0), [1, 0.5, 0.5]),
        new MapCollider(new Vector3(5, 0, 0), [0.5, 0.5, 0.5]),
        new MapCollider(new Vector3(6.5, -1, 0), [1, 0.5, 0.5]),
        new MapCollider(new Vector3(9.5, 0, 0), [2, 0.5, 0.5]),
        new MapCollider(new Vector3(11, -3, 0), [0.5, 2.5, 0.5]),
        new MapCollider(new Vector3(8.5, -6, 0), [3, 0.5, 0.5]),

        //tSpawn
        new MapCollider(new Vector3(23.5, 25.5, 0), [2, 1, 0.5]),
        new MapCollider(new Vector3(27, 26, 0), [1.5, 0.5, 0.5]),
        new MapCollider(new Vector3(14, 25.5, 0), [5.5, 1, 0.5]),
        new MapCollider(new Vector3(13, 30, 0), [10.5, 0.5, 0.5]),
        new MapCollider(new Vector3(26.5, 15.5, 0), [1, 2, 0.5]),
        new MapCollider(new Vector3(26.5, 10.5, 0), [1, 1, 0.5]),
        new MapCollider(new Vector3(20.5, 10, 0), [5, 0.5, 0.5]),

        new MapCollider(new Vector3(24, 28, 0), [0.5, 1.5, 0.5]),
        new MapCollider(new Vector3(29, 22, 0), [0.5, 3.5, 0.5]),
        new MapCollider(new Vector3(27, 18, 0), [1.5, 0.5, 0.5]),
        new MapCollider(new Vector3(18, 22.5, 0), [0.5, 2, 0.5]),
        new MapCollider(new Vector3(18, 17.5, 0), [0.5, 1, 0.5]),
        new MapCollider(new Vector3(19, 17, 0), [0.5, 0.5, 0.5]),
        new MapCollider(new Vector3(19, 15, 0), [0.5, 0.5, 0.5]),
        new MapCollider(new Vector3(15, 19, 0), [0.5, 1.5, 0.5]),
        new MapCollider(new Vector3(16.5, 21, 0), [1, 0.5, 0.5]),

        //mid
        new MapCollider(new Vector3(12, 14, 0), [0.5, 0.5, 0.5]),
        new MapCollider(new Vector3(13, 15.5, 0), [0.5, 1, 0.5]),
        new MapCollider(new Vector3(15, 9.5, 0), [0.5, 1, 0.5]),
        new MapCollider(new Vector3(15, 5.5, 0), [0.5, 1, 0.5]),

        new MapCollider(new Vector3(14.5, 17, 0), [1, 0.5, 0.5]),

        //piper
        new MapCollider(new Vector3(26, 6, 0), [0.5, 3.5, 0.5]),

        //kitchen
        new MapCollider(new Vector3(25.5, 2, 0), [1, 0.5, 0.5]),
        new MapCollider(new Vector3(22, 2, 0), [0.5, 0.5, 0.5]),
        new MapCollider(new Vector3(24, -5, 0), [2.5, 0.5, 0.5]),

        //projector
        new MapCollider(new Vector3(27, 1.5, 0), [0.5, 1, 0.5]),
        new MapCollider(new Vector3(31, 6.5, 0), [0.5, 3, 0.5]),
        new MapCollider(new Vector3(27, -3, 0), [0.5, 1.5, 0.5]),

        new MapCollider(new Vector3(36, 12, 0), [3.5, 0.5, 0.5]),
        new MapCollider(new Vector3(36, 1, 0), [3.5, 0.5, 0.5]),
        new MapCollider(new Vector3(40, 6.5, 0), [0.5, 5, 0.5]),
        
        new MapCollider(new Vector3(32, 13, 0), [0.5, 1.5, 0.5]),
        new MapCollider(new Vector3(29.5, 15, 0), [2, 0.5, 0.5]),
        new MapCollider(new Vector3(29.5, -3, 0), [2, 0.5, 0.5]),
        new MapCollider(new Vector3(32, -0.5, 0), [0.5, 2, 0.5]),
        
        //connector
        new MapCollider(new Vector3(4, 5, 0), [0.5, 0.5, 0.5]),
        new MapCollider(new Vector3(4, 10, 0), [0.5, 0.5, 0.5]),
        new MapCollider(new Vector3(7, 5, 0), [0.5, 0.5, 0.5]),
        new MapCollider(new Vector3(7, 10, 0), [0.5, 0.5, 0.5]),
    ]

    return colliders;
}

export default CollidersPositions;