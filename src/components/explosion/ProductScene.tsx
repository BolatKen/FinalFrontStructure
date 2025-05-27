'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import styles from './ProductScene.module.css';
import { VariantOption } from '@/types/product';

const Model = dynamic(() => import('./Model'), { ssr: false });

export default function ProductScene({ modelUrl = '/models/6.glb', option }: { modelUrl: string; option?: VariantOption }) {
    return (
        <div className={styles['product-model']}>
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <ambientLight intensity={1.2} />
                <OrbitControls
                    // minPolarAngle={Math.PI / 3}
                    // maxPolarAngle={Math.PI / 1.8}
                    // minAzimuthAngle={-Math.PI / 2}
                    // maxAzimuthAngle={Math.PI / 2} 
                    />
                <Suspense fallback={null}>
                    <Model url={modelUrl}
                        color={option?.color.hex_code}
                        part={option?.part.model_part_selector}
                        position={[0, -1.15, 0]}
                        scale={90}
                        dispose={null} 
                        rotation={[0, 0, 0]} // 👈 добавь это
                        />
                </Suspense>
                <Environment files={"/lights/brown_photostudio.hdr"} />
            </Canvas>
        </div>
    )
}

export { default as ProductScene } from './ProductScene';