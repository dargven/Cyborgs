import useMousePosition from "./MousePos"
import { Animator } from "../sprites/Animator";

const CrossHair = () =>{
  const {x,y} = useMousePosition();
  console.log(x,y);
  return (
      <>
        <Animator
          position={[x,y,0]}
          textureImageURL={'./assets/crosshair.png'}
        />
      </>
  );
};
export default CrossHair;