'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import styles from './ProductScene.module.css';

const ModelConfig = dynamic(() => import('./ModelConfig'), { ssr: false });

export default function ProductSceneConfigurator({ modelUrl, part, selectedColor }:
    { modelUrl: string; part?: string, selectedColor?: string }) {
    return (
        <div className={styles['product-model']}>
            <Canvas className={styles.width} camera={{ position: [0, 0, 5], fov: 35 }}>
                <ambientLight intensity={1.2} />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.8}
                    minAzimuthAngle={-Math.PI / 2}
                    maxAzimuthAngle={Math.PI / 2} 
                    />
                <Suspense fallback={null}>
                    <ModelConfig url={modelUrl}
                        color={selectedColor}
                        part={part}
                        position={[0, -1.15, 0]}
                        rotation={[0.1, -Math.PI / 6, 0]}
                        scale={90}
                        dispose={null} />
                </Suspense>
                <Environment files={"/lights/brown_photostudio.hdr"} />
            </Canvas>
        </div>
    )
}

export { default as ProductSceneConfigurator } from './ProductScene';