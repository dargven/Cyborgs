import { Euler, Texture, TextureLoader, Vector3 } from "three";
import MakeSprite from "./MakeSprite";

export interface ITestRoomProps {
    position: Vector3;
    texture: Texture;
    name?: string;
}

const TestRoom = ({ texture, position }: ITestRoomProps) => {

    const textureLoader = new TextureLoader();


    return (
        <group>
            <MakeSprite texture={texture} position={position} isCollider={false} />
        </group>
    );

}

export default TestRoom;