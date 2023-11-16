import { Vector3 } from "three";
interface IContestSpawn {
    position:Vector3;
    team:1|0;
}
class ContestSpawn implements IContestSpawn {
    position:Vector3;
    team:0|1;
    constructor(position:Vector3,team:0|1){
        this.position=position;
        this.team=team;
    }


    // TSpawn() {
    //    const rnd=Math.floor(Math.random() * 10);
    //    switch (rnd) {
    //     case 0:
    //         new Vector3(5, 3, 0)
    //       break;
    //     case 1:
    //         new Vector3(6, 3, 0)
    //       break;
    //     case 2:
    //         new Vector3(7, 3, 0)
    //       break;
    //     default:
    //         new Vector3(8, 3, 0)
    //   }
    // }

    // CtSpawn() {
    //    const rnd=Math.floor(Math.random() * 10);
   
    // } 
}
export default ContestSpawn;