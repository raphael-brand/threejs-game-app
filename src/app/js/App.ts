/* eslint-disable prettier/prettier */
// const log = console.log;
import { Scene } from './Scene'
import { Acceleration } from './Acceleration'

const acc = new Acceleration()
const scene = new Scene()
acc.setLevel([
  [2, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
])

function initCanvas(): HTMLCanvasElement {
  const el: HTMLCanvasElement = document.querySelector('#canvas')!
  return el
}

acc.setCanvas(initCanvas())

acc.draw() && acc.printMap()

const setPosition = () => {
  scene.animate({ position: acc.getPosition() })
}
acc.onMove(setPosition)
