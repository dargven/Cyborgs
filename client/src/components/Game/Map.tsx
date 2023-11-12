import { Texture } from "three";
import MakeSprite from "./MakeSprite";

export interface ITestRoomProps {
    texture: Texture;
    name?: string;
}

const Map = ({ texture }: ITestRoomProps) => {
    return (
        <group>
            <MakeSprite texture={texture} isCollider={false} />
        </group>
    );
}

export default Map;