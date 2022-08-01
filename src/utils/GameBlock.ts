export class GameBlock {
    isMine: boolean
    isOpen: boolean
    constructor(options?: { isMine?: boolean, isOpen?: boolean }) {
        let option = options || { isMine: false, isOpen: false }
        this.isMine = option.isMine || false
        this.isOpen = option.isOpen || false
    }
}