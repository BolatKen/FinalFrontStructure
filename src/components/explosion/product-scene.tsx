'use client'
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import ChairGLB from './ChairGLB';
import styles from './ProductScene.module.css';

export default function ProductScene({ color }: any) {
    return (
        <>
            <div className={styles['product-model']}>
                <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
                    <ambientLight intensity={1.2} />
                    <OrbitControls />
                    <Suspense fallback={null}>
                        <ChairGLB color={color} position={[0, -1, 0]}/>
                    </Suspense>
                    <Environment files={"/lights/studio_small_08.hdr"} />
                </Canvas>
            </div>
        </>
    )
}

export { default as ProductScene } from './product-scene';