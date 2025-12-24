import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';

export default function Hero3D() {
  return (
    <div className="h-[400px] w-full bg-black">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={5000} factor={4} />
        <mesh rotation={[0, 0, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial color="#FFD700" wireframe />
        </mesh>
        <Text position={[0, 0, 2]} fontSize={0.5} color="white">
          THE LAND OF VIHARAS
        </Text>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}