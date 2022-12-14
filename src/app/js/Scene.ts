/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/// <reference path="../../../typings/index.d.ts" />
import * as THREE from 'three'

import {
	PerspectiveCamera,
	BoxGeometry,
	MeshBasicMaterial,
	Mesh,
	WebGLRenderer,
} from 'three'

interface IScene {
	init(): void
	animate(params: Object): void
	wrapperElement: HTMLBodyElement | null
	perspectiveStats: HTMLDivElement
}

export class Scene implements IScene {
	scene = new THREE.Scene()
	camera: THREE.PerspectiveCamera = new PerspectiveCamera()
	geometry: THREE.BoxGeometry = new BoxGeometry(0, 0, 0)
	material: THREE.MeshBasicMaterial = new MeshBasicMaterial()
	cube: THREE.Mesh = new Mesh()
	renderer: THREE.WebGLRenderer = new WebGLRenderer()

	container!: HTMLElement
	w: number
	h: number
	camera_start: THREE.Vector3

	constructor() {
		this.w = this.h = 300
		this.camera_start = new THREE.Vector3()
		this.init()
	}

	wrapperElement: HTMLBodyElement = document.querySelector('body')
	perspectiveStats!: HTMLDivElement

	init() {
		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera(30, 1, 1, 1000)
		this.container = document.createElement('div')

		this.geometry = new THREE.BoxGeometry(50, 50, 50)
		this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
		this.cube = new THREE.Mesh(this.geometry, this.material)
		this.scene.add(this.cube)
		this.renderer = new THREE.WebGLRenderer()
		this.renderer.setSize(this.w, this.h)

		this.camera_start.z = 300
		const newLocal = this
		/*    this.camera.position = this.camera_start */
		newLocal.camera.position.setZ(300)
		this.renderer.render(this.scene, this.camera)

		this.wrapperElement.appendChild(this.container)
		this.container.appendChild(this.renderer.domElement)
		//document.getElementById('perspective').appendChild(this.container)
	}

	animate(params: Object): void {
		requestAnimationFrame(() => this.animate(params))
		this.scene.add(this.cube)
		this.camera.lookAt(this.cube.position)
		this.renderer.render(this.scene, this.camera)
		//document.querySelector('#perspective_stats').innerHTML =
		this.perspectiveStats.innerHTML = this.cube.position.x.toString()
	}
}

/*


let currentFrame = 0;
let animate;
let rotationSpeed = (rotation = { speed: { x: 0, y: 0 } }) => {
  cube.rotation.x += rotation.speed.x;
  cube.rotation.y += rotation.speed.y;
}
let position = (pos = { x: 0, y: 0, z: 0 }) => {
  //requestAnimationFrame(() => position({'position': pos}));
  //cube.position = position;
  //return;
  for (let p in pos) {
    console.log(p, ':', pos[p]);
    if (position[p] > 0)
      cube['translate' + p.toUpperCase()](pos[p] + 200);
    //else
    //cube.position[p] = 0;
  }

  // cube.translateY(position.y);
  // cube.translateZ(position.z);
  //console.log(cube);
  //cube.updateMatrix();

  //requestAnimationFrame(() => animate({'position': pos}));
  log(cube.position.x);
  log('x:%i, y:%i, z:%i', cube.position.x, cube.position.y, cube.position.z)
}


*/
