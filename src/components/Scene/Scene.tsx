import * as Three from 'three';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stats, Image, useCursor } from '@react-three/drei';
import { AnimationClip, BufferGeometry, Material, Mesh } from 'three';
import { TbCheck, TbEdit } from 'react-icons/tb';

import { CameraRig } from '@/services/Controls/CameraRig';
import { ScrollControls } from '@/services/Controls/controlschemes/ScrollControls';
import { TListing } from '@/store/market/types';
import { getIPFSImage } from '@/helpers/getIPFSImage';
import { cameraData } from '@/components/Scene/constans';
import { Gallery } from '@/components/Scene/Gallery/Gallery';
import { CameraHelper } from '@/services/Controls/camerahelper';
import { FreeMovementControls } from '@/services/Controls/controlschemes/FreeMovementControls';

import styles from './Scene.module.scss';

const GOLDENRATIO = 1.61803398875;

const positions = [
  [-2, 0, -6],
  [-2.75, 0, -5.5],
  [-3.5, 0, -5],
  [1.5, 0, -6],
  [2.95, 0, -7.5],
  [3.5, 0, -5],
].map((pos) => new Three.Vector3(pos[0], pos[1], pos[2]));

const rotations = [
  [0, Math.PI / 2.75, 0],
  [0, Math.PI / 2.75, 0],
  [0, Math.PI / 2.75, 0],
  [0, -Math.PI / 4.75, 0],
  [0, -Math.PI / 5, 0],
  [0, -Math.PI / 2.75, 0],
].map((pos) => new Three.Euler(pos[0], pos[1], pos[2]));

function Frames({ images }: { images: TSceneImage[] }) {
  return (
    <group>
      {images.map((props) => (
        <Frame key={props.url} {...props} />
      ))}
    </group>
  );
}

function Frame({ url, c = new Three.Color(), ...props }: { url: string; c?: Three.Color }) {
  const [hovered, hover] = useState(false);
  const [rnd] = useState(() => Math.random());
  const image = useRef<Mesh<BufferGeometry, Material> | null>(null);
  const frame = useRef<Mesh<BufferGeometry, Material> | null>(null);

  useCursor(hovered);
  useFrame((state) => {
    if (!image.current) {
      return;
    }

    // image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
    image.current.scale.x = Three.MathUtils.lerp(image.current.scale.x, 0.85 * (hovered ? 0.85 : 1), 0.1);
    image.current.scale.y = Three.MathUtils.lerp(image.current.scale.y, 0.9 * (hovered ? 0.905 : 1), 0.1);

    // frame.current.material.color.lerp(c.set(hovered ? 'orange' : 'white'), 0.1);
  });

  return (
    <group {...props}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          hover(true);
        }}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial color='#151515' metalness={0.5} roughness={0.5} envMapIntensity={2} />
        <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
      </mesh>
    </group>
  );
}

const Composition = ({ images }: { images: TSceneImage[] }) => {
  const { camera, scene } = useThree();
  const rig = useMemo(() => new CameraRig(camera, scene), [camera, scene]);
  const controls = useMemo(
    () =>
      new ScrollControls(rig, {
        scrollElement: document.getElementById('scroller'),
        dampingFactor: 0.1,
      }),
    [rig],
  );

  useEffect(() => {
    rig.setAnimationClip(AnimationClip.parse(cameraData.animationClip));
    rig.setAnimationTime(0);
    controls.enable();
  }, [rig, controls]);

  useFrame(() => {
    controls.update();
  });

  return (
    <group position={[0, -1, 0]}>
      <Frames images={images} />
    </group>
  );
};

const Editor = ({ images }: { images: TSceneImage[] }) => {
  const { camera, scene, gl } = useThree();

  const rig = useMemo(() => new CameraRig(camera, scene), [camera, scene]);
  const controls = useMemo(() => new FreeMovementControls(rig), [rig]);
  const cameraHelper = useMemo(
    () => new CameraHelper(rig, controls, gl, scene, document.getElementById('scene') as HTMLCanvasElement),
    [rig, controls, scene, gl],
  );

  useEffect(() => {
    rig.setAnimationClip(AnimationClip.parse(cameraData.animationClip));
    rig.setAnimationTime(0);
    controls.enable();
  }, [rig, controls]);

  useFrame(() => {
    controls.update(window.performance.now());
    cameraHelper.update(window.performance.now());
  });

  return (
    <group position={[0, -1, 0]}>
      <Frames images={images} />
    </group>
  );
};

interface IScene {
  listings: TListing[];
}

type TSceneImage = {
  url: string;
  rotation: Three.Euler;
  position: Three.Vector3;
};

export const Scene: React.FC<IScene> = (props) => {
  const { listings } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isEditor, setIsEditor] = useState<boolean>(false);

  const toggleEditor = () => setIsEditor((editor) => !editor);

  const images = useMemo<TSceneImage[]>(
    () =>
      listings.map(({ imageCID, imagePath }, index) => ({
        position: positions[index],
        rotation: rotations[index],
        url: getIPFSImage({ imageCID, imagePath }),
      })),
    [listings],
  );

  return (
    <div id={'scene'} className={styles.scene}>
      <Canvas ref={canvasRef} className={styles.container}>
        <ambientLight intensity={0.8} />
        {isEditor ? <Editor images={images} /> : <Composition images={images} />}
        <Gallery />
      </Canvas>
      <div className={styles.overlay}>
        <button className={styles.button} onClick={toggleEditor}>
          {isEditor ? <TbCheck /> : <TbEdit />}
        </button>
      </div>
      <Stats />
      <div id='scroller' className={styles.scroller} />
    </div>
  );
};
