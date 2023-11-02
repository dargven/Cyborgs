

const LightMap = () => {
    return (
        <group>
        <ambientLight intensity={1} />
        {/* SIDE HALL LIGHT */}
        <pointLight position={[9, 8, 3]} intensity={0.5} />
        <pointLight position={[-11, 8, 3]} intensity={0.5} />
        <pointLight position={[0, 9, 3]} intensity={10} />
        <spotLight position={[5, 5, 3]} intensity={10} />
        {/*  */}

        {/* LONG HALL LIGHT */}
        <pointLight position={[-10, 3, 3]} intensity={0.5} />
        <pointLight position={[-11, -5, 3]} intensity={0.5} />
        {/*  */}

        {/* T SPAWN LIGHT */}
        <pointLight position={[10, 0, 3]} intensity={0.5} />
        <pointLight position={[0, -5, 3]} intensity={0.5} />
        <pointLight position={[8, -10, 3]} intensity={0.5} />
        {/*  */}
    </group>
    )
}

export default LightMap;