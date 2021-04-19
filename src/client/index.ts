import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls';

class Game {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public geometry: THREE.BoxGeometry;
  public material: THREE.MeshBasicMaterial;
  public cube: THREE.Mesh;

  public controls: OrbitControls;

  init() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.geometry = new THREE.BoxGeometry();
    this.material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.camera.position.z = 2;
    this.scene.add(this.cube);
  }

  constructor() {
    this.init();
    document.body.appendChild(this.renderer.domElement);
    this.handleWindowResize();
    this.animate();
  }

  handleWindowResize() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.render();
    });
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.controls.update();

    this.render();
  };
}

new Game();
