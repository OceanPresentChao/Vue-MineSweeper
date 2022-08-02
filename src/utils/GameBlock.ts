export interface GameBlockOption {
    isMine?: boolean
    isOpen?: boolean
    isFlag?: boolean
}

let defaultOptions: GameBlockOption = {
    isMine: false,
    isOpen: false,
    isFlag: false
}

export class GameBlock {
    isMine: boolean
    isOpen: boolean
    isFlag: boolean
    aroundMines: number
    constructor(options?: GameBlockOption) {
        let option = options || defaultOptions
        this.isMine = option.isMine || false
        this.isOpen = option.isOpen || false
        this.isFlag = option.isFlag || false
        this.aroundMines = 0
    }
}