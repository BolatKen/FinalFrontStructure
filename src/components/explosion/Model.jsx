'use client';
import { Color } from 'three';
import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useLoader } from '@react-three/fiber';

const Model = (props) => {

    const gltf = useLoader(GLTFLoader, props.url)
    const color = props.color;

    useEffect(() => {
        if (!color || !gltf?.scene) return;

        gltf.scene.traverse((child) => {
            if (child.isMesh && child.name === 'seat_le_1') {
                child.material.color = new Color(color);
            }
        });
    }, [gltf, color]);

    return <primitive object={gltf.scene} {...props} />;
}

export default Model;