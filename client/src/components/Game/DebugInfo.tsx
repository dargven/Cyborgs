//выводить на сцену блок с текстом в котором будет постоянно обновляющаяся инфа 
//По сути должно быть до пизды импортов потому что я беру инфу 


import { Html, Text } from "@react-three/drei"
import { TPlayer } from "../../modules/Server/types"

interface IDebug {
    player: TPlayer,
    debugRef: any
}

const Debug = ({player, debugRef}: IDebug) => {
    return(
        <group ref={debugRef}>
            <Text fontSize={0.1} position={[0,4.2,0]} >
                x = {Math.round(player.x)} | y = {Math.round(player.y)} | vx = { player.vx } | vy = { player.vy } | dx = { player.dx } | dy = { player.dy } | hp = { player.hp } | team = { player.teamId }   
            </Text>
        </group>
    )
}


export default Debug;