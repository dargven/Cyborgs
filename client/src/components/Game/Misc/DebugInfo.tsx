import { Text } from "@react-three/drei"
import { TPlayer } from "../../../modules/Server/types"

interface IDebug {
    player: TPlayer,
}

const Debug = ({player}: IDebug) => {
    return(
        <Text fontSize={0.25}>
            x = {Math.round(player.x)} | y = {Math.round(player.y)} | vx = { player.vx } | vy = { player.vy } | dx = { player.dx } | dy = { player.dy } | hp = { player.hp } | team = { player.teamId }   
        </Text>
    )
}


export default Debug;