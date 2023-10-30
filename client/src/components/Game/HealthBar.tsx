import { Color } from "three";

export interface IHealthBarProps {
    value: number;
    color?: Color|number;
}

const HealthBar = (props: IHealthBarProps) => {
    return (
        <sprite position={[0, 0.75, 0]} scale={[props.value / 100, 0.25, 0]}>
            <spriteMaterial color={props.color} />
        </sprite>
    );
}

export default HealthBar;