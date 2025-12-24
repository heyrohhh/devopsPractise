import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Text, MeshDistortMaterial } from '@react-three/drei';
import './App.css'; // Importing the CSS file we'll create

function DataSphere({ info }) {
  // If data hasn't loaded yet, show a simple placeholder or nothing
  if (!info) return null;

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial 
          color="#ffd700" // Changed to gold for visibility against black
          speed={3} 
          distort={0.4} 
          roughness={0.2} 
          metalness={0.8}
        />
      </mesh>
      <Text 
        position={[0, 2.5, 0]} 
        fontSize={0.4} 
        color="white" 
        anchorX="center" 
        anchorY="middle"
      >
        BIHAR: {info?.stats?.districts || '38'} Districts
      </Text>
    </Float>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/bihar')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="scene-container">
      {/* Overlay UI */}
      <div className="ui-overlay">
        <h1 className="title">The Heritage of Bihar</h1>
        
        {loading ? (
          <p>Loading History...</p>
        ) : (
          <>
            <p className="description">{data?.history?.ancient}</p>
            <div className="stats-panel">
              <h3>Migration Trends</h3>
              {data?.stats?.migration?.map((m, i) => (
                <div key={i} className="stat-item">
                  <span className="dest">{m.destination}</span>
                  <span className="rate">{m.rate}%</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 3D Scene */}
      <Canvas camera={{ position: [0, 0, 7] }}>
        <color attach="background" args={['#050505']} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="orange" intensity={0.5} />
        
        <DataSphere info={data} />
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

export default App;