import { Euler, Texture, TextureLoader, Vector3 } from "three";
import MakeSprite from "./MakeSprite";
import { Space } from "../../assets/images";

export interface ITestRoomProps {
    position: Vector3;
    texture: Texture;
    name?: string;
}

const TestRoom = ({ texture, position }: ITestRoomProps) => {

    const textureLoader = new TextureLoader();
    const TSPACE = textureLoader.load(Space);


    return (
        <group>
            <MakeSprite texture={texture} position={position} isCollider={false} />
            {/* <MakeSprite texture={TSPACE} position={position} isCollider={true}/> */}
        </group>
    );

}

export default TestRoom;