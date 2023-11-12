import { Texture } from "three";
import MakeSprite from "./MakeSprite";

interface IMapProps {
    texture: Texture;
}

const Map = ({ texture }: IMapProps) => {
    return (
        <group>
            <MakeSprite texture={texture} />
        </group>
    );
}

export default Map;