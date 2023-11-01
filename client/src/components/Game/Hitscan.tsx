import { useEffect, useRef } from "react";
import { Line, Vector3 } from "three";
import { ReactThreeFiber, extend } from '@react-three/fiber'
import { BallCollider } from "@react-three/rapier";
extend({ Line_: Line })

declare global {
	namespace JSX {
		interface IntrinsicElements {
			line_: ReactThreeFiber.Object3DNode<Line, typeof Line>
		}
	}
}

interface IHitscanProps {
	initialPosition: number[];
	aimingPoint: number[];
}

const Hitscan = (props: IHitscanProps) => {
	const laserRef = useRef<Line>(null!);
	useEffect(() => {
		laserRef.current.geometry.setFromPoints([props.initialPosition, props.aimingPoint].map((point) => new Vector3(...point)));
	}, [props.initialPosition, props.aimingPoint]);

	return (
		<sprite>
			<line_ ref={laserRef}>
				<lineBasicMaterial color={0x0000ff} />
				<BallCollider args={[0.1]} />
			</line_>
		</sprite>
	)
}

export default Hitscan;