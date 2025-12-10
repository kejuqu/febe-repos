import React, { useEffect } from "react";
import * as THREE from "three";
import "./App.css";

function App() {
  const RemoteBtn = React.lazy(() => import("remote/c-button"));

  useEffect(() => {
    // 创建场景
    const scene = new THREE.Scene();

    // 创建相机 近大远小
    const camera = new THREE.PerspectiveCamera(
      45, // 视野角度
      window.innerWidth / window.innerHeight, // 宽高比
      0.1, // 近剪裁面
      1000 // 远剪裁面
    );

    // 创建渲染器(渲染器是将场景渲染到页面中的工具)
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 将渲染器添加到页面中
    document.body.appendChild(renderer.domElement);

    // 创建一个几何体
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // 创建一个材质
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });

    // 创建一个网格模型(网格模型由几何体和材质组成)
    const cube = new THREE.Mesh(geometry, material);

    // 将网格模型添加到场景中(场景是渲染的容器)
    // 物体之所以能被人眼看见，一种是它自身的材料就能发光，不需要借助外界光源；
    // 另一种是自身材料不发光，需要反射环境中的光。
    // 对于自身不能发光的物体，需要给场景添加光源从而达到可视的效果。
    scene.add(cube);

    // 设置相机位置
    camera.position.z = 5;
    // 设置相机目标位置(相机看向的点)
    camera.lookAt(0, 0, 0);

    // 渲染函数
    function animate() {
      requestAnimationFrame(animate);
      // 让立方体动起来
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return (
    <>
      <React.Suspense fallback={<div>loading...</div>}>
        <RemoteBtn onClick={() => alert("clicked")} />
      </React.Suspense>
    </>
  );
}

export default App;
