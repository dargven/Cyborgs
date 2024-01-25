import { useState } from "react"
import NavButton from "../navButton";
import "./GameFinish.css";
const GameFinish=()=>{
    const [teamResult,setTeamResult]=useState<boolean>(false);



    return(
    <>
    <div className="Overlay">
    {
        
        teamResult ?
        (
            <>
                <div className="Win">Победа</div><div className="WinMessage">вы одержали победу </div>
            </>
        ):
        (
            <>
                <div className="Loose">Поражение</div><div className="LooseMesage">повезет в следующий раз</div>
            </>
        )
        
    }</div>
        <NavButton
        to="/main"
        text="вернуться в лобби"
        className="Next"
        ></NavButton> 
        
    </>)
}
export default GameFinish;