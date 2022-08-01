export enum GameStatus {
    WIN, LOSE, RUNNING, STOP
}



export interface GameOptions {
    width?: number
    height?: number
    mine?: number
}