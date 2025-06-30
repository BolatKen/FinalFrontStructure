'use client';
import { Color } from 'three';
import { useEffect, useMemo } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useLoader } from '@react-three/fiber';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

const Model = (props) => {
    const gltf = props.url ? useLoader(GLTFLoader, props.url) : null;
    const color = props.color;
    const part = props.part;

    // Клонируем сцену, чтобы избежать shared reference.
    const clonedScene = useMemo(() => (gltf && gltf.scene ? clone(gltf.scene) : null), [gltf]);

    useEffect(() => {
        if (!color || !clonedScene) return;

        clonedScene.traverse((child) => {
            if (child.isMesh && child.name === part) {
                child.material.color = new Color(color);
            }
        });
    }, [clonedScene, color, part]);

    return clonedScene ? <primitive object={clonedScene} {...props} /> : null;
};

export default Model;
