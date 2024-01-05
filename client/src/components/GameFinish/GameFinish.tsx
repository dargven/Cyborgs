import { useState } from "react"
import NavButton from "../navButton";

const GameFinish=()=>{
    const [teamResult,setTeamResult]=useState<boolean>(true);



    return(
    <>
    {
        teamResult ?
        (
            <>
                <div className="Win">Победа</div><div className="WinMessage">вы одержали победу </div>
            </>
        ):
        (
            <>
                <div className="Loose">Поражение</div><div className="LooseMesage">повезёт в следующий раз</div>
            </>
        )
    }
        <NavButton
        to="/main"
        text="вернуться в лоби"
        className="Next"
        ></NavButton> 
        
    </>)
}
export default GameFinish;