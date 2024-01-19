export {};

// import { useContext, useEffect, useState } from "react";
// import { Text } from "@react-three/drei";
// import { ServerContext } from "../../../App";


// interface ITimer {
//     isMatchEnd: boolean
// }


// const Timer = ({isMatchEnd}:ITimer) => {

//     // const maxTime = matchEnd - matchStart;
    
//     // const [counter, setCounter] = useState(maxTime)

//     useEffect(()=>{
//         if (counter>0){
//             setTimeout(()=>setCounter(counter-1),1000)
//         }

//         if (counter === 0){
//             isMatchEnd = true;
//         }
//     },[counter])

//     return(
//         <Text fontSize={0.25}>
//             {counter}
//         </Text>
//     )
// }

// export default Timer;