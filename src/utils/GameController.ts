import type { GameOptions } from "./type"
import { GameStatus } from "./type"
import { GameBlock } from "./GameBlock"
import { ref } from "vue"
const defaultConfig: Required<GameOptions> = {
    width: 5,
    height: 5,
    mine: 5
}

const siblingDirections = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0]
]

const aroundDirections = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1]
]

export class GameController {
    status: GameStatus
    width: number
    height: number
    mine: number
    remaining: number
    blocks: Array<Array<GameBlock>>
    isCheat: boolean
    isFirstClick: boolean

    constructor(options?: GameOptions) {
        let option: Required<GameOptions> = Object.assign.call(defaultConfig, options || {})
        this.status = GameStatus.STOP
        this.width = option.width
        this.height = option.height
        this.mine = option.mine
        this.remaining = option.mine
        this.isCheat = false
        this.isFirstClick = true

        this.blocks = new Array()
        this.initGame()
    }
    initGame() {
        for (let i = 0; i < this.width; i++) {
            this.blocks.push(new Array())
            for (let j = 0; j < this.height; j++) {
                this.blocks[i].push(new GameBlock({ x: i, y: j }))
            }
        }
    }
    generateMines(block: GameBlock) {
        let count = 0
        while (count < this.mine) {
            let x = Math.round(Math.random() * (this.width - 1))
            let y = Math.round(Math.random() * (this.height - 1))
            if (!this.blocks[x][y].isMine && !(x === block.x && y === block.y)) {
                this.blocks[x][y].isMine = true
                count++
                let aroundBlocks = this.getBlocksFromDir(this.blocks[x][y], aroundDirections)
                aroundBlocks.forEach((b) => {
                    b.aroundMines++
                })
            }
        }
    }
    openBlock(block: GameBlock) {
        // console.log(block);
        if (this.isFirstClick && this.status === GameStatus.STOP) {
            this.isFirstClick = false
            this.status = GameStatus.RUNNING

            this.generateMines(block)
        }
        if (this.status !== GameStatus.RUNNING) {
            return
        }
        if (block.isFlag || block.isOpen) {
            return
        }
        if (block.isMine) {
            this.status = GameStatus.LOSE
            this.onLose()
            return
        }
        block.isOpen = true
        this.expandZero(block)
        this.checkGameStatus()
    }
    expandZero(block: GameBlock) {
        let siblingBlocks = this.getBlocksFromDir(block, siblingDirections)
        // console.log(aroundBlocks);
        for (let b of siblingBlocks) {
            if (b.isFlag || b.isMine || b.isOpen) {
                continue
            }
            b.isOpen = true
            this.expandZero(b)
        }
    }
    autoOpen(block: GameBlock) {
        // console.log("auto");
        if (this.status !== GameStatus.RUNNING) {
            return
        }
        let aroundBlocks = this.getBlocksFromDir(block, aroundDirections)
        let flagCount = 0
        let waitToOpen: GameBlock[] = []
        for (let b of aroundBlocks) {
            if (b.isFlag) {
                flagCount++
            } else {
                waitToOpen.push(b)
            }
        }
        if (flagCount === block.aroundMines) {
            waitToOpen.forEach((b) => {
                this.openBlock(b)
            })
        }
    }
    setFlag(block: GameBlock) {
        // console.log("flag");
        if (this.status !== GameStatus.RUNNING || block.isOpen || this.remaining <= 0) {
            return
        }
        block.isFlag = block.isFlag === true ? false : true
        block.isFlag ? this.remaining-- : this.remaining++
    }
    getBlocksFromDir(block: GameBlock, directions: Array<Array<number>>) {
        let res: GameBlock[] = []
        let x = block.x
        let y = block.y
        // console.log(`x=${x},y=${y}`);
        for (let [dx, dy] of directions) {
            let i = x + dx
            let j = y + dy
            if (i >= 0 && i < this.width && j >= 0 && j < this.height) {
                res.push(this.blocks[i][j])
            }
        }
        return res
    }
    toggleCheat() {
        this.isCheat = this.isCheat === true ? false : true
    }
    checkGameStatus() {
        const blockArray = this.blocks.flat()
        let isWin = true
        for (let b of blockArray) {
            if (b.isMine && b.isOpen) {
                this.status = GameStatus.LOSE
                this.onLose()
                return
            }
            if (!b.isMine && !b.isOpen) {
                isWin = false
            }
        }
        if (isWin) {
            this.status = GameStatus.WIN
            this.onWin()
            return
        }
    }
    onLose() {
        this.blocks.flat().forEach((b) => {
            b.isOpen = true
        })
        alert("you lose!!")
    }
    onWin() {
        alert("you win!!")
    }
}