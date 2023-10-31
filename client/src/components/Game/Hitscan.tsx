import { useMemo } from "react";
import { Vector3 } from "three";

interface IHitscanProps {
	direction: Vector3;
	initialPosition: Vector3;
}

const Hitscan = (props: IHitscanProps) => {
	// const positions = useMemo(() => new Float32Array([...props.initialPosition, ...props.direction]), [props.initialPosition, props.direction])

	return (
		<sprite>
			<line>
				<bufferGeometry>
					{/* <bufferAttribute attach="attributes-position" count={positions.length} array={positions} itemSize={2} /> */}
				</bufferGeometry>
				<lineBasicMaterial color={0x0000ff} />
			</line>
		</sprite>
	)
}

export default Hitscan;