import { Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const Gallery = () => {
  const { scene } = useLoader(GLTFLoader, '/assets/gallery.glb');

  return (
    <Suspense fallback={null}>
      <primitive object={scene} position={[0, -10.5, -9]} />
    </Suspense>
  );
};
