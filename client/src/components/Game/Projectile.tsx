import { PROJECTILE } from "../../assets/images";
import MakeSprite from "./MakeSprite";
import { Vector3, Mesh } from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

interface IProjectiileProps {
	initialSpeed: number
}

const Progectile = (props: IProjectiileProps) => {
	const bulletRef = useRef<Mesh>(null!)
	const [active, setActive] = useState<boolean>(false)

	useFrame((clock, delta) => {
		if (active) {
			const dx: string = delta.toExponential();
			bulletRef.current.position.x -= +dx * props.initialSpeed;
		}
	  });

	return(
		<mesh ref={bulletRef} onClick={() => setActive(!active)}>
			<MakeSprite texture={PROJECTILE} position={new Vector3(-1, 0.1, 0)} rotation={[Math.PI / 2, -Math.PI, Math.PI]} />
		</mesh>
	)
}

export default Progectile;