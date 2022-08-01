import type { GameOptions } from "./type"
import { GameStatus } from "./type"
import { GameBlock } from "./GameBlock"
const defaultConfig: Required<GameOptions> = {
    width: 5,
    height: 5,
    mine: 5
}


export class GameController {
    status: GameStatus
    width: number
    height: number
    mine: number
    blocks: Array<Array<GameBlock>>
    constructor(options?: GameOptions) {
        let option: Required<GameOptions> = Object.assign.call(defaultConfig, options || {})
        this.status = GameStatus.STOP
        this.width = option.width
        this.height = option.height
        this.mine = option.mine
        this.blocks = new Array()
        this.initGame()
    }
    initGame() {
        for (let i = 0; i < this.width; i++) {
            this.blocks.push(new Array())
            for (let j = 0; j < this.height; j++) {
                this.blocks[i].push(new GameBlock())
            }
        }
        let count = 0
        while (count < this.mine) {
            let x = Math.floor(Math.random() * (this.width - 1))
            let y = Math.floor(Math.random() * (this.height - 1))
            console.log(`x=${x},y=${y}`);
            if (!this.blocks[x][y].isMine) {
                this.blocks[x][y].isMine = true
                count++
            }
        }
    }
}