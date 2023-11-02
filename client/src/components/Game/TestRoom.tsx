import { Texture, Vector3 } from "three";
import MakeSprite from "./MakeSprite";

export interface ITestRoomProps {
    texture: Texture;
    name?: string;
}

const TestRoom = ({ texture}: ITestRoomProps) => {
    return (
        <group>
            <MakeSprite texture={texture} isCollider={false} />
        </group>
    );
}

export default TestRoom;