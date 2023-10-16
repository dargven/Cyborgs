import { EdgesGeometry, LineBasicMaterial, LineSegments } from "three";
import { BoxGeometry } from "three";
import { TMakeCollider } from "./Types";


const MakeCollider = ({ size=[1, 1, 0.1], edgeWidth }: TMakeCollider) => {
    const [width, height, depth] = size;
    const edgeColor = 'red';
    const edges = new EdgesGeometry(new BoxGeometry(width, height, depth));
    const lineMaterial = new LineBasicMaterial({ color: edgeColor, linewidth: edgeWidth });
    const edgeLines = new LineSegments(edges, lineMaterial);
    
    return (
        <group>
            <primitive object={edgeLines} key={'collider'}/>
        </group>
      );
    
}

export default MakeCollider;