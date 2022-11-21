type Axis = number

/* eslint-disable no-unused-vars */
class PlayerPosition {
  _x!: Axis
  _y!: Axis
  _z!: Axis

  static _x: number
  static _y: number
  static _z: number

  public static get x(): Axis {
    return this._x
  }
  public static set x(value: Axis) {
    this._x = value
  }

  public static get y(): Axis {
    return this._y
  }
  public static set y(value: Axis) {
    this._y = value
  }

  public static get z(): Axis {
    return this._z
  }
  public static set z(value: Axis) {
    this._z = value
  }

  constructor(x: number, y: number, z: number) {
    this._x = x
    this._y = y
    this._z = z
  }
}

interface ArrayConstructor {
  from(arrayLike: any, mapFn?: undefined, thisArg?: undefined): Array<any>
}

declare class TargetElement implements EventTarget {
  addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void
  removeEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: boolean | EventListenerOptions | undefined,
  ): void

  dispatchEvent(evt: Event): boolean
  className: string
}

interface IAcceleration {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  fieldSize: number
  size: number
  playerPosition: any
  playerAt: any
  free: number
  wall: number
  player: number
  _level: number[][]

  // map view
  toggleView: boolean

  getInstance(): Acceleration
  getCode(x: any): any
  move(direction: string): boolean
  getPosition(): any
  onKeyDown(e: KeyboardEvent, callback: Function): Event
  setCanvas(canvas: Element): void
  setLevel(map: number[][]): void
  onMove(callback: Function): void

  draw(): boolean
  printMap(): void
}
/**
 * draws an Acceleration object with keyboard support to a given canvas element
 *
 *   # example
 *     let acc = new Acceleration();
 *     acc.setCanvas(document.querySelector('#canvas'));
 *     acc.setLevel([
 *     [2, 1, 1, 1, 1, 1, 1, 0],
 *     [0, 1, 0, 0, 0, 1, 1, 0],
 *     [0, 1, 0, 1, 0, 1, 0, 0],
 *     [0, 0, 0, 1, 0, 1, 0, 1],
 *     [1, 1, 1, 1, 0, 1, 0, 1],
 *     [1, 0, 0, 0, 0, 1, 0, 1],
 *     [1, 0, 1, 1, 1, 1, 0, 1],
 *     [1, 0, 0, 0, 0, 0, 0, 1]
 *    ]);
 *     acc.draw() && acc.printMap();
 */
class BaseAcceleration implements IAcceleration {
  canvas!: HTMLCanvasElement
  ctx!: CanvasRenderingContext2D
  fieldSize!: number
  getCode: any
  playerPosition!: PlayerPosition
  playerAt!: PlayerPosition

  size!: number

  free!: number
  wall!: number
  player!: number

  // map view
  toggleView!: boolean

  getInstance(): any {
    return this
  }

  draw(): boolean {
    return true
  }
  printMap(): void {}

  move(_direction: string): any | boolean {}

  getPosition() {}

  onKeyDown(_e: KeyboardEvent, _callback: Function): any | Event {}

  setCanvas(_canvas: Element): void {}

  setLevel(_map: number[][]): void {}

  onMove(_callback: Function): void {}
}
export class Acceleration extends BaseAcceleration {
  size: number

  //PlayerPosition: PlayerPosition;
  declare canvas: HTMLCanvasElement
  declare ctx: CanvasRenderingContext2D
  fieldSize: number
  static playerPosition: PlayerPosition
  playerAt: PlayerPosition

  declare onMoveCallBack: Function

  free: number
  wall: number
  player: number

  // map view
  toggleView: boolean
  static free: any
  static player: any
  static playerAt: PlayerPosition
  private _level: any
  static _level: any
  static level: any
  public get level(): any {
    return this._level
  }
  public set level(value: any) {
    this._level = value
  }

  constructor() {
    super()
    console.log('constructor called')
    this.size = 300
    console.log(this.size)
    this.playerAt = this.playerPosition
    this.fieldSize = this.size / 1
    this.playerPosition = new PlayerPosition(0, 0, 0)
    this.free = 0
    this.wall = 1
    this.player = 2
    this._level
    this.playerAt = this.playerPosition

    Array.from(document.querySelectorAll('button')).forEach(el =>
      el.addEventListener('click', this.onKeyDown, false),
    )

    window.addEventListener('keydown', this.onKeyDown, false)

    // map view
    this.toggleView = false // window.innerWidth <= 414;
    // collapse map view for desktop and expand for mobile devices having a smaller screen width than 414
    this.onWindowResize(false)

    //move();
    //draw();
    //console.clear();
    //document.querySelector(".up").focus();
    // TODO: add overlay, info_button, info_button_text, up, right, down, left
    /**
     *
     *    overlay: HTMLDivElement
     *    info_button: HTMLDivElement
     *    info_button_text: string
     *    up: HTMLButtonElement
     *    right: HTMLButtonElement
     *    down: HTMLButtonElement
     *    left: HTMLButtonElement
     *
     */
    setTimeout(
      function (el: {
        classList: { remove: (arg0: string) => any }
        blur: () => any
      }) {
        el.classList.remove('active'), el.blur()
        //document.querySelector(".info.button").focus();
        document.querySelector('.overlay').classList.add('hidden')
        window.addEventListener('resize', this.onWindowResize)
        //document.querySelector('.info.button').innerHTML += '<br>' + printMap();
      },
      500,
      document.querySelector('.up'),
    )
    document.querySelector('.info.button').addEventListener(
      'click',
      function (_e) {
        this.toggleView = !this.toggleView
        this.onWindowResize(false)
      },
      false,
    )
    console.log('Legend:\n player is 2,\nfield free-to-go is 0,\nno-go is 1')
    //printMap();
    // return this;
  }

  getInstance(): Acceleration {
    return this
  }

  public static getCode(x: string) {
    return {
      '38': 'up',
      '40': 'down',
      '37': 'left',
      '39': 'right',
    }[x]
  }

  draw(): boolean {
    this.ctx.fillStyle = 'darkgray'
    this.ctx.fillRect(0, 0, this.size, this.size)
    this.ctx.fillStyle = 'lightgreen'
    console.dir(this.playerPosition, this.playerAt)
    this.ctx.fillRect(
      this.playerPosition._x * this.fieldSize,
      this.playerPosition._y * this.fieldSize,
      this.fieldSize,
      this.fieldSize,
    )
    this.printMap()
    return true
  }

  getPosition() {
    const pos = this.playerAt
    // TODO: change it
    pos._z = pos._y // mhh ...
    console.dir(pos)
    return this.playerAt ? pos : this.playerPosition
  }

  onKeyDown(e: any) {
    const retObj = {
      handleEvent: this.onMoveCallBack,
    }
    const code = Acceleration.getCode(e.keyCode)
      ? Acceleration.getCode(e.keyCode)
      : e.target.className
    console.log('>>>', code)

    Acceleration.move(code) &&
      this.draw() &&
      setTimeout(function () {
        Array.from(document.querySelectorAll('.btnWrap button')).forEach(
          function (el) {
            return el.classList.remove('active')
          },
        )
        return true
      }, 400) &&
      code &&
      document.querySelector('.' + code).classList.add('active')
    setTimeout(function () {
      if (code)
        //return document.querySelector('.' + code).blur();
        return true
    }, 400)
    return retObj
  }

  static move(direction: string) {
    console.log('moving', direction)
    console.log('current', this.playerPosition)
    //const current = JSON.parse(JSON.stringify(this.playerPosition))
    let hasMoved = false
    switch (direction) {
      case 'up':
        if (
          this.playerPosition._x > 0 &&
          this._level[this.playerPosition._y - 1] &&
          this._level[this.playerPosition._y - 1][this.playerPosition._x] ===
            this.free
        ) {
          --this.playerPosition._y
          hasMoved = true
        }
        break
      case 'down':
        if (
          this.playerPosition._y < this.level.length - 1 &&
          this._level[this.playerPosition._y + 1] &&
          this._level[this.playerPosition._y + 1][this.playerPosition._x] ===
            this.free
        ) {
          ++this.playerPosition._y
          hasMoved = true
        }
        break
      case 'left':
        if (
          this.playerPosition._x > 0 &&
          this._level[this.playerPosition._y][this.playerPosition._x - 1] ===
            this.free
        ) {
          --this.playerPosition._x
          hasMoved = true
        }
        break
      case 'right':
        if (
          this.playerPosition._x <
            this._level[this.playerPosition._y].length - 1 &&
          this._level[this.playerPosition._y][this.playerPosition._x + 1] ===
            this.free
        ) {
          ++this.playerPosition._x
          hasMoved = true
        }
        break
    }

    if (hasMoved) {
      this._level[current.y][current.x] = this.free
      this._level[this.playerPosition._y][this.playerPosition._x] = this.player
      this.playerAt = this.playerPosition
      //console.clear();
      console.log('Player has moved ' + direction)
      this.onMoveCallBack()
    }
    return hasMoved
  }
  static onMoveCallBack() {
    throw new Error('Method not implemented.')
  }

  onWindowResize(update: boolean) {
    if (update) this.toggleView = window.innerWidth <= 414

    if (this.toggleView)
      document.querySelector('.info.button').classList.add('active')
    else document.querySelector('.info.button').classList.remove('active')
  }

  printMap() {
    let str = ''

    const info =
      'Player at ' + this.playerAt._y + ' ' + this.playerAt._x + '\n <br>'

    for (const row of this.level) {
      str += row.toString().split(',').join('  ') + '\n <br>'
    }
    //console.log(info + str);
    document.querySelector('.info.button .innerText').innerHTML =
      info +
      str
        .replace(/0/gi, '<b class="zero" style="color:#bbb;">0</b>')
        .replace('2', '<b style="color:darkgreen;">2</b>')
    return info + str
  }

  setCanvas(canvas: Element): void {
    this.canvas = <HTMLCanvasElement>canvas
    this.ctx = this.canvas.getContext('2d')
  }

  setLevel(map: number[][]) {
    this.level = map
    console.log('level:')
    console.info(this.size, this.level[0].length)
    this.fieldSize = Math.floor(this.size / this.level[0].length)
    console.log(Math.floor(this.size / this.level[0].length))
  }

  onMove(callback: Function) {
    this.onMoveCallBack = callback
  }
}
//export {IAcceleration, PlayerPosition, Acceleration};
