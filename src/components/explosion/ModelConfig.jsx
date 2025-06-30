'use client';
import { Color } from 'three';
import { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useLoader } from '@react-three/fiber';

const ModelConfig = (props) => {

    const color = props.color;
    const part = props.part;

    // Only load the model if props.url is valid
    const gltf = props.url ? useLoader(GLTFLoader, props.url) : null;

    if (gltf && gltf.scene) {
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                console.log(child.name);
            }
        });
    }


    useEffect(() => {
        if (!color || !gltf?.scene) return;

        gltf.scene.traverse((child) => {
            if (child.isMesh && child.name === part) {
                child.material.color = new Color(color);
            }
        });
    }, [gltf, color]);

    if (!gltf || !gltf.scene) return null;

    return <primitive object={gltf.scene} {...props} />;
}

export default ModelConfig;