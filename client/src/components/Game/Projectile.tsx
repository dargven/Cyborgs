import { PROJECTILE } from "../../assets/images";
import MakeSprite from "./MakeSprite";
import { Vector3 } from "three";

const Progectile = () => {
	return(
		<mesh>
			<MakeSprite texture={PROJECTILE} position={new Vector3(-1, 0.1, 0)} rotation={[Math.PI / 2, -Math.PI, Math.PI]} />
		</mesh>
	)
}

export default Progectile;