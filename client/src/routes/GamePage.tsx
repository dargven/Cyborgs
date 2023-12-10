// import {useContext, useEffect, useState} from "react";
// import {ServerContext} from "../App";
// import Game_0 from "../components/Game/Game";
// import useKeyHandler from "../hooks/useKeyHandler";
// import NavButton from "../components/navButton";
// import Chat from "../components/Chat/Chat";
// import "../popUpMenu.css";
// import "../TeamSelect.css";

// const GamePage = () => {
   
    // const [stopMove, setStopMove] = useState({
    //     isPopupVisible: false,
    //     isChatClicked: false,
    //     blockMove: false
    // });

//     const [team, setTeam] = useState<0 | 1 | null>(null);

//     useEffect(() => {
//         return() => {
//             console.log('111')
            
//         }
//     },[team,stopMove])

//     const StopMove = () => {
//         setStopMove((prevState) => ({
//            ...prevState,
//            blockMove: true,
//            isChatClicked: true
//       }));
//     }

//     return (
//         <div>
        
           
//             {/* Ебучая вылезающая менюшка */}
//             {stopMove.isPopupVisible && (
//                 <div
//                     className="popUpMenu"
//                     onClick={() =>
//                         setStopMove((prevState) => ({
//                             ...prevState,
//                             isPopupVisible: false,
//                             blockMove: false
//                         }))}
//                 >
//                     <div
//                         className="popUpMenu__content"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <button
//                             onClick={() =>
//                                 setStopMove((prevState) => ({
//                                     ...prevState,
//                                     isPopupVisible: false,
//                                     blockMove: false
//                                 }))}
//                             className="popUpBtn"
//                         >
//                             Возобновить
//                         </button>
//                         <NavButton
//                             to="/game"
//                             text="Настройки"
//                             className="popUpBtn"
//                         />
//                         <NavButton
//                             to="/main"
//                             text="Выход"
//                             className="popUpBtn"
//                         />
//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// };

// export default GamePage;
