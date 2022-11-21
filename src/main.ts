import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/** ---------------------------------------------------------
 * SCENE
 --------------------------------------------------------- */
const scene = new THREE.Scene()

/** ---------------------------------------------------------
 * CAMERA
 --------------------------------------------------------- */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
)

/** ---------------------------------------------------------
 * RENDERER
 --------------------------------------------------------- */
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg') as HTMLCanvasElement,
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)
renderer.render(scene, camera)

/** ---------------------------------------------------------
 * LIGHTS
 --------------------------------------------------------- */
const pointLight = new THREE.PointLight(0xf1f1f1)
pointLight.position.set(10, 10, 10)

const ambientLight = new THREE.AmbientLight(0xf1f1f1)

scene.add(pointLight)
scene.add(ambientLight)

/** ---------------------------------------------------------
 * HELPERS
 --------------------------------------------------------- */

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50)

// scene.add(lightHelper, gridHelper)

/** ---------------------------------------------------------
 * CONTROLS
 --------------------------------------------------------- */
const controls = new OrbitControls(camera, renderer.domElement)

/** ---------------------------------------------------------
 * GEOMETRY
 --------------------------------------------------------- */
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({
  color: 0x387fff,
})
const torus = new THREE.Mesh(geometry, material)
scene.add(torus)

/** ---------------------------------------------------------
 * ADD STAR
 --------------------------------------------------------- */
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3)
    .fill(0)
    .map(() => THREE.MathUtils.randFloatSpread(200))

  star.position.set(x, y, z)
  scene.add(star)
}

Array(200).fill(0).forEach(addStar)

/** ---------------------------------------------------------
 * BG IMAGE
 --------------------------------------------------------- */
const spaceTexture = new THREE.TextureLoader().load(
  'assets/space.jpeg',
  texture => {
    scene.background = texture
  },
)

/** ---------------------------------------------------------
 * DOGE
 --------------------------------------------------------- */
const dogeTexture = new THREE.TextureLoader().load('assets/dogememe.jpeg')

const doge = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: dogeTexture }),
)
scene.add(doge)

/** ---------------------------------------------------------
 * MOON
 --------------------------------------------------------- */
const moonTexture = new THREE.TextureLoader().load('assets/moon.jpeg')
const normalTexture = new THREE.TextureLoader().load('assets/normal.jpeg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  }),
)

moon.position.z = 30
moon.position.setX(-10)

scene.add(moon)

/** ---------------------------------------------------------
 * MOVE CAMERA
 --------------------------------------------------------- */
function moveCamera() {
  const t = document.body.getBoundingClientRect().top

  moon.rotation.x += 0.05
  moon.rotation.y += 0.075
  moon.rotation.z += 0.05

  doge.rotation.y = 0.1
  doge.rotation.z = 0.1

  camera.position.z = t / 50
  scene.rotation.y = t / 100
  // scene.rotation.x = t / 100
}

document.body.onscroll = moveCamera

/** ---------------------------------------------------------
 * ANIMATE
 --------------------------------------------------------- */
function animate() {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  controls.update()

  renderer.render(scene, camera)
}

animate()
